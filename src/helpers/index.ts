import { Schema } from 'sanity';
import { SingletonPluginOptions } from '../types';

export const getSingletonDocuments = (schema: Schema) =>
  schema._original?.types
    .filter(({ options }) => (options as SingletonPluginOptions)?.singleton)
    .map((s: { name: string }) => s.name);

export const getIsSingleton = (schema: Schema, schemaType: string) => {
  const documentSchema = schema._original?.types?.find(
    ({ name }) => name == schemaType
  );

  return (
    (documentSchema?.options as SingletonPluginOptions)?.singleton ?? false
  );
};
