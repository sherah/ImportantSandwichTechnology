expect = chai.expect

describe "randomMessage", ->
  it "generates a random message to include in an email", ->
    newMsg = randomMessage()
    newerMsg = randomMessage()

    expect(newerMsg).to.not.equal(newMsg)