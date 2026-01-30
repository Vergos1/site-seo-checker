import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditEnum } from "../types/audit";

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  link!: string;

  @Column()
  type!: AuditEnum;

  @Column()
  score!: number;

  @Column()
  date!: Date;
}
