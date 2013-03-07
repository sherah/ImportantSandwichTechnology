expect = chai.expect

describe "randomMessage", ->
  it "generates a random message to include in an email", ->
    newMsg = randomMessage()
    newerMsg = randomMessage()

    expect(newerMsg).to.not.equal(newMsg)


		
# describe "Array", ->
#   describe "#indexOf()", ->
#     it "should return -1 when the value is not present", ->
#       chai.assert.equal -1, [1, 2, 3].indexOf(1)
#       chai.assert.equal -1, [1, 2, 3].indexOf(0)

