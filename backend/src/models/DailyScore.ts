import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyScore extends Document {
  date: string;        // "YYYY-MM-DD" UTC
  playerId: string;    // client-generated UUID — identifies the device/browser
  playerName: string;  // display name chosen when sharing
  score: number;       // lower is better (total error / deviation)
  completedAt: Date;
  shareId: string;     // short public ID used in share links
}

const dailyScoreSchema = new Schema<IDailyScore>({
  date:        { type: String, required: true, index: true },
  playerId:    { type: String, required: true },
  playerName:  { type: String, required: true, trim: true, maxlength: 30 },
  score:       { type: Number, required: true, min: 0 },
  completedAt: { type: Date, default: Date.now },
  shareId:     { type: String, required: true, unique: true },
});

// Enforce one submission per player per day
dailyScoreSchema.index({ date: 1, playerId: 1 }, { unique: true });

export const DailyScore = mongoose.model<IDailyScore>('DailyScore', dailyScoreSchema);
