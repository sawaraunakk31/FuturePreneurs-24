import mongoose from 'mongoose';

const   qualifiedTeamSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
      unique: true,
    },
    teamLeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    teamNumber: {
      type: Number,
    },
    leaderName: {
      type: String,
    },
    leaderEmail: {
      type: String,
    },
    isQualified: {
      type: Boolean,
      default: false,
    },
    level: {
      type: Number,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    teamCode: {
      type: String,
      sparse: true,
      unique: true, 
    },
    codeExpiry: {
      type: Date,  
    },
    page: {
      type: Number,
    },
    interest1: {
      type: Number,
    },
    interest2: {
      type: Number,
    },
    loan1: {
      type: Number,
    },
    loan2: {
      type: Number,
    },
    creditScore: {
      type: Number,
    },
    allocatedBond: {
      type: mongoose.Schema.Types.ObjectId,
    },
   
    wallet: {
      type: Number,  
    },
    loanAmt: {
      type: Number, 
    },
    interest1Percent: {
      type: Number,  // (1.2% is stored as 1.2)
    },
    interest2Percent: {
      type: Number,  
    },
  },
  { collection: 'QualifiedTeam' }
);

export const QualifiedTeam =
  mongoose.models.QualifiedTeam || mongoose.model('QualifiedTeam', qualifiedTeamSchema);
