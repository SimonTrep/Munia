import type { AssistantListResponse, AssistantsEndpoint } from 'librechat-data-provider';
import { EModelEndpoint } from 'librechat-data-provider';
import { useMemo } from 'react';
import type { AssistantListItem } from '~/common';
import { useListAssistantsQuery } from '~/data-provider';

const selectAssistantsResponse = (res: AssistantListResponse): AssistantListItem[] =>
  res.data.map(({ id, name, metadata, model, description }) => ({
    id,
    name: name ?? 'Unnamed Assistant',
    metadata: {
      ...metadata,
      icon: metadata?.icon ?? '/images/assistants.png', // Default icon
    },
    model,
    description: description ?? 'No description available', // Default description
  }));

export default function useAssistantListMap<T = AssistantListItem[] | null>(
  selector: (res: AssistantListResponse) => T = selectAssistantsResponse as (
    res: AssistantListResponse,
  ) => T,
): Record<AssistantsEndpoint, T | null> {
  const { data: assistantsList = null } = useListAssistantsQuery(
    EModelEndpoint.assistants,
    undefined,
    {
      select: selector,
    },
  );

  const { data: azureAssistants = null } = useListAssistantsQuery(
    EModelEndpoint.azureAssistants,
    undefined,
    {
      select: selector,
    },
  );

  const assistantListMap = useMemo(() => {
    return {
      [EModelEndpoint.assistants]: assistantsList as T,
      [EModelEndpoint.azureAssistants]: azureAssistants as T,
    };
  }, [assistantsList, azureAssistants]);

  return assistantListMap;
}
