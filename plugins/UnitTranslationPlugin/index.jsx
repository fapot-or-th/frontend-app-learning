import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import { AppContext } from '@edx/frontend-platform/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useModel } from '@src/generic/model-store';

import TranslationSelection from './translation-selection';
import FeedbackWidget from './feedback-widget';
import getData from './api';

const UnitTranslationPlugin = ({ id, courseId }) => {
  const [unitId, setUnitId] = useState('');
  const { authenticatedUser: { userId } } = React.useContext(AppContext);

  const { language } = useModel(
    'coursewareMeta',
    courseId,
  );
  const [translationConfig, setTranslationConfig] = useState({
    enabled: false,
    availableLanguages: [],
  });

  useEffect(() => {
    getData().then(setTranslationConfig);
  }, []);

  useEffect(() => {
    const { pathname } = window.location;
    const currentUnitId = pathname.substring(pathname.lastIndexOf('/') + 1);
    setUnitId(currentUnitId);
  }, [window.location.search]);

  useEffect(() => {
    const feedbackWidget = (
      <IntlProvider locale="en">
        <FeedbackWidget
          courseId={courseId}
          translationLanguage={selectedLanguage}
          unitId={unitId}
          userId={userId}
        />
      </IntlProvider>
    );
    const domNode = document.getElementById('whole-course-translation-feedback-widget');
    render(feedbackWidget, domNode);
  }, [
    courseId,
    selectedLanguage,
    unitId,
    userId,
  ]);

  const { enabled, availableLanguages } = translationConfig;

  if (!enabled || !language) {
    return null;
  }

  return (
    <TranslationSelection
      id={id}
      courseId={courseId}
      language={language}
      availableLanguages={availableLanguages}
    />
  );
};

UnitTranslationPlugin.propTypes = {
  id: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default UnitTranslationPlugin;
