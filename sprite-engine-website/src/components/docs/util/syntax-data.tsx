export const customCppStyle = {
    'comment': {
      color: '#008000', // Dark theme comment color
    },
    'keyword': {
      color: '#569CD6', // Dark theme keyword color
    },
    'string': {
      color: '#CE9178', // Dark theme string color
    },
    'number': {
      color: '#B5CEA8', // Dark theme number color
    },
    'operator': {
      color: '#D4D4D4', // Dark theme operator color
    },
    'function': {
      color: '#DCDCAA', // Dark theme function color
    },
    'class-name': {
      color: '#4EC9B0', // Dark theme class name color
    },
    'object': {
      color: '#4EC9B0', // Dark theme object color
    },
    'pre[class*="language-"]': {
      backgroundColor: '#1E1E1E', // Dark theme background color
      padding: '20px', // Default padding
      borderRadius: '5px', // Default border radius
    },
  };
  
  const blueColor = "#569CD5";
  const greyColor = "#808080";
  const objectColor = "#4EC9B0";
  const functionColor = "#E4E0B7";
  
  export let classes = [
    { name: "public", color: blueColor },
    { name: "int", color: blueColor },
    { name: "string", color: objectColor },
  ];
  
  let functions = [
    "SetParentId",
    "SetId",
    "GetSprite",
    "GetTexture",
    "ClearParentData",
    "ClearAllChilds",
    "SetParent",
    "RemoveChild",
    "SetSpriteTexture",
    "SetSpriteTexture",
    "SetSpriteTexture",
    "GetNode",
    "GetId",
    "IsParent",
    "ContainsChild",
    "ContainsChild",
    "GetParentId",
    "getPathOfTextureFile"
  ];

 export let components = [
    "SpriteRenderer",
    "BoxCollider",
    "PhysicsBody",
    "Transform",
    "Prefab",
    "Animator",
    "Light"
  ]
  
  let objects = [
    "string",
    "Sprite",
    "ImGuiTextFilter",
    "Vector2",
    "Texture",
    "int32_t",
    "LightRepository",
  ];
  
  let cppKeywords = [
    "auto",
    "const",
    "double",
    "float",
    "short",
    "unsigned",
    "void",
    "enum",
    "bool",
    "typename",
    "constexpr",
    "virtual",
    "volatile",
    "extern",
    "static",
    "noexcept",
  ];
  
  // Adding objects with objectColor to classes list
  objects.forEach(name => {
    classes.push({ name: name, color: objectColor });
  });
  
  // Adding C++ keywords with blueColor to classes list
  cppKeywords.forEach(name => {
    classes.push({ name: name, color: blueColor });
  });
  
  // Adding functions with functionColor to classes list
  functions.forEach(name => {
    classes.push({ name: name, color: functionColor });
  });
  
  
  components.forEach(name => {
    classes.push({ name: name, color: objectColor });
  });