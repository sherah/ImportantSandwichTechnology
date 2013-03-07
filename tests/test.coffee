# describe "randomMessage", ->
# 	it "generates a random message to include in an email", ->
# 		var newMsg = randomMessage();
# 		var newerMsg = randomMessage();

		
describe "Array", ->
  describe "#indexOf()", ->
    it "should return -1 when the value is not present", ->
      assert.equal -1, [1, 2, 3].indexOf(1)
      assert.equal -1, [1, 2, 3].indexOf(0)

