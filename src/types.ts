import { ConfigContext, DocumentOptions } from 'sanity';
import { StructureBuilder } from 'sanity/structure';
import { ComponentType } from 'react';

export interface SingletonDocumentListItemConfig {
  S: StructureBuilder;
  context: ConfigContext;
  type: string;
  title?: string;
  id?: string;
  icon?: ComponentType;
}

export interface SingletonPluginListItemsConfig {
  S: StructureBuilder;
  context: ConfigContext;
}

export interface SingletonPluginOptions extends DocumentOptions {
  singleton?: boolean;
}
