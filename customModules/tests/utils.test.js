import * as c from "../constants";
import { constructFieldConfig } from "../utils";

describe("utils", () => {
  describe("constructFieldConfig", () => {
    describe("validations", () => {
      it("throws error if no type", () => {
        expect(() => constructFieldConfig({ type: undefined })).toThrowError();
        expect(() =>
          constructFieldConfig({ type: c.FIELD_TYPE_MARKDOWN })
        ).not.toThrowError();
      });

      it("throws error if type is multi-reference and contentType is not array", () => {
        expect(() =>
          constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: "hello"
          })
        ).toThrowError();

        expect(() =>
          constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: undefined
          })
        ).not.toThrowError();

        expect(() =>
          constructFieldConfig({
            type: c.FIELD_TYPE_MULTI_REFERENCE,
            contentType: ["hi"]
          })
        ).not.toThrowError();
      });
    });
  });
});
