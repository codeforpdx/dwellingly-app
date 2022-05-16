import { isValidDate } from "components/src/utils/date/index"

describe("Date util methods", () => {
  // TODO: cover the test on the method 'formatDate'
  // HINT: for testing it mock the date creation from javascript or mock the current locale

  describe("isValidDate", () => {
    it("should be a valid date", () => {
      const result = isValidDate("11/29/2021 12:25:44")

      expect(result).toEqual(true)
    })

    it("should be false when is undefined", () => {
      const result = isValidDate(undefined)

      expect(result).toEqual(false)
    })

    it("should be false when is null", () => {
      const result = isValidDate(null)

      expect(result).toEqual(false)
    })

    it("should be false when is invalid date", () => {
      const result = isValidDate("11//2021 12:25:")

      expect(result).toEqual(false)
    })
  })
})
