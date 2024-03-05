import { DocumentOptions } from 'sanity';
import { StructureBuilder } from 'sanity/structure';
import { ComponentType } from 'react';

export interface SingletonDocumentListItemConfig {
  S: StructureBuilder;
  schemaType: string;
  title?: string;
  id?: string;
  icon?: ComponentType;
}

export interface SingletonPluginOptions extends DocumentOptions {
  singleton?: boolean;
}
