define({ "api": [
  {
    "type": "get",
    "url": "/api/test",
    "title": "测试接口",
    "name": "Test",
    "group": "Test",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回測試數據.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功示例:",
          "content": "{\n  \"data\": \"测试成功\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/test.js",
    "groupTitle": "Test"
  },
  {
    "type": "get",
    "url": "/api/user/:id",
    "title": "获取用户信息",
    "name": "GetUserInfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>用户姓名.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功示例:",
          "content": "{\n  \"name\": \"Zzc\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/test.js",
    "groupTitle": "User"
  }
] });
