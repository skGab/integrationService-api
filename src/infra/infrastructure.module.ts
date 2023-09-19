import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BigQuery } from '@google-cloud/bigquery';

// INFRA
import { CreateDatasetService } from './bigQuery/create-dataset.service';
import { CreateTableService } from './bigQuery/create-table.service';
import { BigQueryRepositoryService } from './bigQuery/bigQuery-repository.service';
import { MondayRepositoryService } from './monday/monday-repository.service';

// DOMAIN
import { MondayRepository } from 'src/domain/monday/monday-repository';
import { BigQueryRepository } from 'src/domain/bigQuery/bigQuery-repository';
import { CallApiService } from './monday/call-api.service';

@Module({
  // CONFIGURATION
  imports: [
    HttpModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
  ],

  // SERVICES
  providers: [
    // WITHOUT CONTRACTS
    BigQuery,
    CreateDatasetService,
    CreateTableService,
    CallApiService,

    // WITH CONTRACTS
    {
      provide: MondayRepository,
      useClass: MondayRepositoryService,
    },
    {
      provide: BigQueryRepository,
      useClass: BigQueryRepositoryService,
    },
  ],

  exports: [MondayRepository, BigQueryRepository],
})
export class InfrastructureModule {}
