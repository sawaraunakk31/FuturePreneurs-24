import mongoose from 'mongoose';

const bondSchema = mongoose.Schema(
  {
    bondNumber: {
      type: Number,
      unique: true,
    },
    highestBid: {
      type: Number,
    },
    teamId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'TeamModel'
    },
    teamLeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    allocated:{
      type: Boolean,
      default: false,
    },
    bondValue: {
      type: Number, //! Actual value not to be displayed (get from research)
    }
  },
  { collection: 'BondModel' }
);

export const BondModel =
  mongoose.models.BondModel || mongoose.model('BondModel', bondSchema);
