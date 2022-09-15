export type JsonFieldList = JsonField[];

export interface JsonField {
  key: string;
  value: any;
  type: string;
}

export default class JsonParser {
  public static parse(jsonString: string): JsonFieldList {
    const json = JSON.parse(jsonString);
    return this.transformToJsonFieldList(json);
  }

  private static transformToJsonFieldList(jsonObj: Object): JsonFieldList {
    const jsonFieldList: JsonFieldList = [];
    for (let key in jsonObj) {
      jsonFieldList.push(this.transformToJsonField(key, jsonObj[key]));
    }
    return jsonFieldList;
  }

  private static transformToJsonField(key: string, value: any): JsonField {
    let type: string = typeof value;

    if (type === 'object') {
      if (value === null) {
        type = 'string';
      } else if (Array.isArray(value)) {
        type = 'array';
        for (let itemKey in value) {
          value[itemKey] = this.transformToJsonField(itemKey, value[itemKey]);
        }
      } else {
        type = 'json';
        value = this.transformToJsonFieldList(value);
      }
    }

    return {
      key: key,
      value: value,
      type: type,
    };
  }
}
