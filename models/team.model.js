import mongoose from 'mongoose';

const teamSchema = mongoose.Schema(
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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    teamCode: {
      type: String,
      sparse: true,
      unique: true, // Ensure the team code is unique
    },
    codeExpiry: {
      type: Date,  // To store the time when the code expires
    },
  },
  { collection: 'TeamModel' }
);

export const TeamModel =
  mongoose.models.TeamModel || mongoose.model('TeamModel', teamSchema);
