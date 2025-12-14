import { generateGuid } from '@foblex/utils';
import { TKey } from '../t-key';

export function guid(): TKey {
  return generateGuid();
}
