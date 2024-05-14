import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ObjectIdColumn,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { OrderItemEntity } from './order-item.entity';
  
  @Entity()
  export class EventOrderEntity {
    @ObjectIdColumn()
    id: number;
  
    @Column()
    @Index()
    customerId: number;
  
    @Column()
    @Index()
    productId: number;
  
    @Column()
    quantity: number;
  
    @Column()
    price: number;
  
    @Column()
    status: string;
  
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    // @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
    // items: OrderItemEntity[];
  }
  