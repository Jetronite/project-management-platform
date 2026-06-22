import { logger } from '@/lib/logger/logger';
import { Logger } from 'pino';

/**
 * Foundation for the Service Layer Pattern.
 * Automatically provisions a child logger bound to the specific service domain.
 */
export abstract class BaseService {
  protected logger: Logger;

  constructor(serviceName: string) {
    this.logger = logger.child({ service: serviceName });
  }
}