import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTournamentSettingsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  rodadas?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  playOff?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  timer?: number; // 0 = tempo livre
}
