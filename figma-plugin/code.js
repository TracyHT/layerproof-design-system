// LayerProof Token Sync Plugin v2
// Variable aliasing + light/dark mode + Secondary (pink) tokens

// ─── Color scales ─────────────────────────────────────────────────────────────

var YELLOW = {
  "100": { r: 0xff/255, g: 0xfd/255, b: 0xe8/255, a: 1 },
  "200": { r: 0xff/255, g: 0xf8/255, b: 0xc0/255, a: 1 },
  "300": { r: 0xff/255, g: 0xf0/255, b: 0x94/255, a: 1 },
  "400": { r: 0xff/255, g: 0xe8/255, b: 0x60/255, a: 1 },
  "500": { r: 0xff/255, g: 0xde/255, b: 0x42/255, a: 1 },
  "600": { r: 0xe6/255, g: 0xc2/255, b: 0x00/255, a: 1 },
  "700": { r: 0xb8/255, g: 0x99/255, b: 0x00/255, a: 1 },
  "800": { r: 0x7a/255, g: 0x66/255, b: 0x00/255, a: 1 },
  "900": { r: 0x3d/255, g: 0x33/255, b: 0x00/255, a: 1 },
};

var PINK = {
  "100": { r: 0xfd/255, g: 0xe8/255, b: 0xef/255, a: 1 },
  "200": { r: 0xfb/255, g: 0xc5/255, b: 0xd8/255, a: 1 },
  "300": { r: 0xf5/255, g: 0x98/255, b: 0xbb/255, a: 1 },
  "400": { r: 0xef/255, g: 0x69/255, b: 0x94/255, a: 1 },
  "500": { r: 0xe8/255, g: 0x33/255, b: 0x6c/255, a: 1 },
  "600": { r: 0xc4/255, g: 0x34/255, b: 0x60/255, a: 1 },
  "700": { r: 0x9a/255, g: 0x25/255, b: 0x50/255, a: 1 },
  "800": { r: 0x6e/255, g: 0x18/255, b: 0x39/255, a: 1 },
  "900": { r: 0x44/255, g: 0x0e/255, b: 0x23/255, a: 1 },
};

// ─── Alias tables ─────────────────────────────────────────────────────────────
// Format: [variableName, lightModeAliasTarget, darkModeAliasTarget]
// __BLACK__ / __WHITE__ = look up Brand Theme black/white variable, fallback to raw

var ACCENT_ALIASES = [
  ["Accent/Surface/disable",    "Color/Yellow/100", "Color/Yellow/900"],
  ["Accent/Surface/surface",    "Color/Yellow/200", "Color/Yellow/800"],
  ["Accent/Surface/light",      "Color/Yellow/300", "Color/Yellow/700"],
  ["Accent/Surface/default",    "Color/Yellow/500", "Color/Yellow/500"],
  ["Accent/Surface/dark",       "Color/Yellow/800", "Color/Yellow/200"],
  ["Accent/Surface/darker",     "Color/Yellow/900", "Color/Yellow/100"],
  ["Accent/Text-Icon/default",  "Color/Yellow/800", "Color/Yellow/500"],
  ["Accent/Text-Icon/on-color", "__BLACK__",        "__BLACK__"],
  ["Accent/Text-Icon/disable",  "Color/Yellow/300", "Color/Yellow/700"],
  ["Accent/Divider/default",    "Color/Yellow/600", "Color/Yellow/500"],
  ["Accent/Divider/light",      "Color/Yellow/200", "Color/Yellow/800"],
  ["Accent/Divider/disable",    "Color/Yellow/300", "Color/Yellow/700"],
  ["Accent/Divider/on-color",   "__BLACK__",        "__BLACK__"],
];

var SECONDARY_ALIASES = [
  ["Secondary/Surface/disable",    "Color/Pink/100", "Color/Pink/900"],
  ["Secondary/Surface/surface",    "Color/Pink/200", "Color/Pink/800"],
  ["Secondary/Surface/light",      "Color/Pink/300", "Color/Pink/700"],
  ["Secondary/Surface/default",    "Color/Pink/600", "Color/Pink/500"],
  ["Secondary/Surface/dark",       "Color/Pink/800", "Color/Pink/200"],
  ["Secondary/Surface/darker",     "Color/Pink/900", "Color/Pink/100"],
  ["Secondary/Text-Icon/default",  "Color/Pink/600", "Color/Pink/500"],
  ["Secondary/Text-Icon/on-color", "__WHITE__",      "__WHITE__"],
  ["Secondary/Text-Icon/disable",  "Color/Pink/300", "Color/Pink/700"],
  ["Secondary/Divider/default",    "Color/Pink/600", "Color/Pink/500"],
  ["Secondary/Divider/light",      "Color/Pink/200", "Color/Pink/800"],
  ["Secondary/Divider/disable",    "Color/Pink/300", "Color/Pink/700"],
  ["Secondary/Divider/on-color",   "__WHITE__",      "__WHITE__"],
];

// ─── Font overrides ───────────────────────────────────────────────────────────

var FONT_OVERRIDES = {
  "Darker Grotesque": "Anton",
  "Figtree":          "Roboto",
  "Inter":            "DM Sans",
};

var WEIGHT_MAP = {
  "Bold":      "Bold",
  "Semi Bold": "Medium",
  "SemiBold":  "Medium",
  "Medium":    "Medium",
  "Regular":   "Regular",
  "Light":     "Light",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function post(text) {
  figma.ui.postMessage({ type: "log", text: text });
}

function loadFont(family, style) {
  return figma.loadFontAsync({ family: family, style: style })
    .then(function() { return true; })
    .catch(function() { return false; });
}

// Find the first collection whose name (case-insensitive) contains any of the given fragments
function findCollection(collections, fragments) {
  for (var i = 0; i < fragments.length; i++) {
    for (var j = 0; j < collections.length; j++) {
      if (collections[j].name.toLowerCase().indexOf(fragments[i].toLowerCase()) !== -1) {
        return collections[j];
      }
    }
  }
  return collections.length > 0 ? collections[0] : null;
}

// Find a modeId by matching mode name (case-insensitive) against candidate strings
function findModeId(collection, candidates) {
  for (var i = 0; i < collection.modes.length; i++) {
    var modeName = collection.modes[i].name.toLowerCase();
    for (var j = 0; j < candidates.length; j++) {
      if (modeName.indexOf(candidates[j].toLowerCase()) !== -1) {
        return collection.modes[i].modeId;
      }
    }
  }
  return null;
}

// Build name → Variable object map from all local COLOR vars
function buildVarMap() {
  var allVars = figma.variables.getLocalVariables("COLOR");
  var map = {};
  for (var i = 0; i < allVars.length; i++) {
    map[allVars[i].name] = allVars[i];
  }
  return map;
}

// Resolve alias: returns a VariableAlias value or raw RGBA fallback
function resolveAlias(targetName, varMap) {
  if (targetName === "__BLACK__") {
    var bv = varMap["Brand Theme/Black"] || varMap["Black"] || varMap["black"];
    return bv
      ? figma.variables.createVariableAlias(bv)
      : { r: 0, g: 0, b: 0, a: 1 };
  }
  if (targetName === "__WHITE__") {
    var wv = varMap["Brand Theme/White"] || varMap["White"] || varMap["white"];
    return wv
      ? figma.variables.createVariableAlias(wv)
      : { r: 1, g: 1, b: 1, a: 1 };
  }
  var tv = varMap[targetName];
  if (!tv) {
    console.log("WARNING: alias target not found: " + targetName);
    return null;
  }
  return figma.variables.createVariableAlias(tv);
}

// ─── Step 1: Rename Blue → Yellow ────────────────────────────────────────────

function renameBlueVariables() {
  var allVars = figma.variables.getLocalVariables("COLOR");
  var renamed = 0;
  for (var i = 0; i < allVars.length; i++) {
    if (allVars[i].name.indexOf("Blue") !== -1) {
      allVars[i].name = allVars[i].name.replace(/Blue/g, "Yellow");
      renamed++;
    }
  }
  post("  " + renamed + " variables renamed Blue → Yellow");
}

// ─── Step 2: Discover collections + modes ────────────────────────────────────

function discoverCollections() {
  var collections = figma.variables.getLocalVariableCollections();
  post("Found " + collections.length + " variable collection(s)");

  // Color palette collection (has Yellow, Pink, Gray stop values)
  var colorColl = findCollection(collections, ["color"]);

  // Brand Theme / semantic collection (has Accent, Neutral, etc.)
  var themeColl = null;
  for (var i = 0; i < collections.length; i++) {
    var n = collections[i].name.toLowerCase();
    if (n.indexOf("brand") !== -1 || (n.indexOf("theme") !== -1 && n.indexOf("color") === -1)) {
      themeColl = collections[i];
      break;
    }
  }
  if (!themeColl) themeColl = colorColl;

  // Color collection modes (palette — usually single mode)
  var colorLightId = colorColl ? colorColl.defaultModeId : null;
  var colorDarkId  = colorColl ? findModeId(colorColl, ["dark"]) : null;

  // Theme collection modes — discover or create Dark
  var themeLightId = null;
  var themeDarkId  = null;
  if (themeColl) {
    themeLightId = findModeId(themeColl, ["light", "default", "mode 1"])
                   || themeColl.defaultModeId;
    themeDarkId  = findModeId(themeColl, ["dark"]);
    if (!themeDarkId) {
      try {
        themeDarkId = themeColl.addMode("Dark");
        post("  Created Dark mode in: " + themeColl.name);
      } catch(e) {
        post("  Could not add Dark mode (plan limit?): " + e.message);
      }
    }
  }

  post("  Color collection : " + (colorColl  ? colorColl.name  : "none") + " (light=" + colorLightId + ")");
  post("  Theme collection : " + (themeColl  ? themeColl.name  : "none"));
  post("    Light mode ID  : " + themeLightId);
  post("    Dark  mode ID  : " + (themeDarkId || "none"));

  return {
    colorColl:    colorColl,
    themeColl:    themeColl,
    colorLightId: colorLightId,
    colorDarkId:  colorDarkId,
    themeLightId: themeLightId,
    themeDarkId:  themeDarkId,
  };
}

// ─── Step 3+4: Sync palette variables (Yellow + Pink) ────────────────────────
// Palette vars are reference values — same raw RGBA in every mode

function syncPaletteVars(ctx) {
  if (!ctx.colorColl) { post("  ERROR: no color collection found"); return; }

  var allVars = figma.variables.getLocalVariables("COLOR");
  var byName  = {};
  for (var i = 0; i < allVars.length; i++) byName[allVars[i].name] = allVars[i];

  var defs = [
    ["Color/Yellow/100", YELLOW["100"]],
    ["Color/Yellow/200", YELLOW["200"]],
    ["Color/Yellow/300", YELLOW["300"]],
    ["Color/Yellow/400", YELLOW["400"]],
    ["Color/Yellow/500", YELLOW["500"]],
    ["Color/Yellow/600", YELLOW["600"]],
    ["Color/Yellow/700", YELLOW["700"]],
    ["Color/Yellow/800", YELLOW["800"]],
    ["Color/Yellow/900", YELLOW["900"]],
    ["Color/Pink/100",   PINK["100"]],
    ["Color/Pink/200",   PINK["200"]],
    ["Color/Pink/300",   PINK["300"]],
    ["Color/Pink/400",   PINK["400"]],
    ["Color/Pink/500",   PINK["500"]],
    ["Color/Pink/600",   PINK["600"]],
    ["Color/Pink/700",   PINK["700"]],
    ["Color/Pink/800",   PINK["800"]],
    ["Color/Pink/900",   PINK["900"]],
  ];

  var created = 0, updated = 0;

  for (var i = 0; i < defs.length; i++) {
    var name  = defs[i][0];
    var value = defs[i][1];
    var v     = byName[name];

    if (!v) {
      v = figma.variables.createVariable(name, ctx.colorColl, "COLOR");
      created++;
    } else {
      updated++;
    }

    // Same value in all modes (palette is not theme-aware)
    v.setValueForMode(ctx.colorLightId, value);
    if (ctx.colorDarkId) v.setValueForMode(ctx.colorDarkId, value);
  }

  post("  Palette: " + created + " created, " + updated + " updated");
}

// ─── Steps 5+6: Sync semantic alias variables ─────────────────────────────────

function syncSemanticVars(ctx, aliasDefs, label) {
  if (!ctx.themeColl) { post("  ERROR: no theme collection found"); return; }

  // Rebuild map AFTER palette vars exist so aliases resolve correctly
  var varMap  = buildVarMap();
  var allVars = figma.variables.getLocalVariables("COLOR");
  var byName  = {};
  for (var i = 0; i < allVars.length; i++) byName[allVars[i].name] = allVars[i];

  var created = 0, updated = 0, aliased = 0;

  for (var i = 0; i < aliasDefs.length; i++) {
    var varName     = aliasDefs[i][0];
    var lightTarget = aliasDefs[i][1];
    var darkTarget  = aliasDefs[i][2];

    var v = byName[varName];
    if (!v) {
      v = figma.variables.createVariable(varName, ctx.themeColl, "COLOR");
      created++;
    } else {
      updated++;
    }

    var lightVal = resolveAlias(lightTarget, varMap);
    if (lightVal) {
      v.setValueForMode(ctx.themeLightId, lightVal);
      aliased++;
    }

    if (ctx.themeDarkId) {
      var darkVal = resolveAlias(darkTarget, varMap);
      if (darkVal) {
        v.setValueForMode(ctx.themeDarkId, darkVal);
        aliased++;
      }
    }
  }

  post("  " + label + ": " + created + " created, " + updated + " updated, " + aliased + " alias values set");
}

// ─── Update paint styles (Blue stops → Yellow) ───────────────────────────────

function updatePaintStyles() {
  var styles = figma.getLocalPaintStyles();
  if (styles.length === 0) return;
  post("Found " + styles.length + " paint styles");
  var updated = 0;

  for (var i = 0; i < styles.length; i++) {
    var style = styles[i];
    if (style.name.indexOf("Blue") === -1) continue;

    var parts    = style.name.split("/");
    var stop     = parts[parts.length - 1];
    var newColor = YELLOW[stop];
    if (!newColor) continue;

    var newPaints = [];
    for (var j = 0; j < style.paints.length; j++) {
      var paint = style.paints[j];
      newPaints.push(paint.type === "SOLID"
        ? Object.assign({}, paint, { color: newColor })
        : paint);
    }
    style.paints = newPaints;
    updated++;
  }

  post("  " + updated + " paint styles updated");
}

// ─── Update text styles (font families) ──────────────────────────────────────

function updateTextStyles() {
  var styles = figma.getLocalTextStyles();
  post("Found " + styles.length + " text styles");

  var fonts = [
    { family: "Anton",   style: "Regular" },
    { family: "Roboto",  style: "Regular" },
    { family: "Roboto",  style: "Medium" },
    { family: "Roboto",  style: "Bold" },
    { family: "Roboto",  style: "Light" },
    { family: "DM Sans", style: "Regular" },
    { family: "DM Sans", style: "Medium" },
    { family: "DM Sans", style: "Bold" },
  ];

  return Promise.all(fonts.map(function(f) {
    return loadFont(f.family, f.style);
  })).then(function() {
    var promises = [];
    var counts   = { updated: 0, failed: 0 };

    for (var i = 0; i < styles.length; i++) {
      (function(style) {
        var newFamily = FONT_OVERRIDES[style.fontName.family];
        if (!newFamily) return;

        var newStyle = newFamily === "Anton"
          ? "Regular"
          : (WEIGHT_MAP[style.fontName.style] || "Regular");

        var p = loadFont(newFamily, newStyle).then(function(ok) {
          var applyStyle = ok ? newStyle : "Regular";
          return loadFont(newFamily, applyStyle).then(function(ok2) {
            if (!ok2) { counts.failed++; return; }
            style.fontName = { family: newFamily, style: applyStyle };
            counts.updated++;
          });
        });

        promises.push(p);
      })(styles[i]);
    }

    return Promise.all(promises).then(function() {
      post("  " + counts.updated + " text styles updated, " + counts.failed + " failed");
    });
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

figma.showUI(__html__, { width: 420, height: 380 });

figma.ui.onmessage = function(msg) {
  if (msg.type === "run-sync") {
    post("Starting LayerProof token sync v2...");

    post("Renaming Blue → Yellow...");
    renameBlueVariables();

    post("Discovering collections and modes...");
    var ctx = discoverCollections();

    post("Syncing palette variables (Yellow + Pink)...");
    syncPaletteVars(ctx);

    post("Syncing Accent aliases (yellow theme)...");
    syncSemanticVars(ctx, ACCENT_ALIASES, "Accent");

    post("Syncing Secondary aliases (pink theme)...");
    syncSemanticVars(ctx, SECONDARY_ALIASES, "Secondary");

    post("Updating paint styles...");
    updatePaintStyles();

    post("Updating text styles (fonts)...");
    updateTextStyles().then(function() {
      figma.ui.postMessage({ type: "done" });
    });
  }

  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
