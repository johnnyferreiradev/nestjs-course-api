import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column('float')
  price: number;
}
