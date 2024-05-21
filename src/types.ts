import { ConfigContext, DocumentOptions, SanityDocument } from 'sanity';
import { StructureBuilder } from 'sanity/structure';
import { ComponentType, ReactNode } from 'react';

export interface SingletonDocumentListItemConfig {
  S: StructureBuilder;
  context: ConfigContext;
  type: string;
  title?: string;
  id?: string;
  icon?: ComponentType | ReactNode;
}

export interface SingletonPluginListItemsConfig {
  S: StructureBuilder;
  context: ConfigContext;
}

export interface SingletonPluginOptions extends DocumentOptions {
  singleton?: boolean;
}

export interface SanitySingletonDocument extends SanityDocument {
  options?: {
    singleton?: boolean;
  };
}
