import { DocumentActionsContext, DocumentActionsResolver } from "sanity";
import { getIsSingleton } from "./helpers";

export const actions: DocumentActionsResolver = (
  prev,
  { schema, schemaType }: DocumentActionsContext
) => {
  return getIsSingleton(schema, schemaType)
    ? prev.filter(({ action }) =>
        ["publish", "discardChanges", "restore"].includes(action as string)
      )
    : prev;
};
