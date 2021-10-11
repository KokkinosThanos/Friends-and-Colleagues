const mongoose = require("mongoose");

const Colleague = mongoose.model("Colleagues", {
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
});

const Query = {
  colleagues: async () => Colleague.find(),
};

const Mutation = {
  createColleaugue: async (_, { firstName, lastName, phone, email }) => {
    const colleague = new Colleague({ firstName, lastName, phone, email });
    await colleague.save();
    console.log(colleague);
    return colleague;
  },
  updateColleague: async (_, {id, firstName, lastName, phone, email}) => {
    try{
      const colleague = await Colleague.findByIdAndUpdate( id, {firstName, lastName, phone, email}, {new: true} );
      return colleague;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  },
  deleteColleague: async (_, {id}) => {
    try{
      const colleague = await Colleague.findByIdAndDelete( id );
      return colleague;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
};

module.exports = { Query, Mutation };
