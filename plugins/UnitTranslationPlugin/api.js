import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { logError } from '@edx/frontend-platform/logging';

const fetchTranslationConfig = async (courseId) => {
  const url = `${getConfig().LMS_BASE_URL}/api/translatable_xblocks/config/?course_id=${encodeURIComponent(courseId)}`;
  try {
    const { data } = await getAuthenticatedHttpClient().get(url);
    return {
      enabled: data.feature_enabled,
      availableLanguages: data.available_translation_languages || [],
    };
  } catch (error) {
    logError(`Translation plugin fail to fetch from ${url}`, error);
    return {
      enabled: false,
      availableLanguages: [],
    };
  }
};

export default fetchTranslationConfig;
