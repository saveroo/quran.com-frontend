import React, { Component, PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';
import { loadFootNote } from 'redux/actions/media';

import Container from './Container';

class Translation extends Component {
  componentDidMount() {
    const { index } = this.props;
    let trans;

    if (__CLIENT__) {
      trans = document.getElementById(`trans${index}`).children[1]; // eslint-disable-line no-undef
      trans.addEventListener('click', this.fetchFootNote, true);
    }
  }

  componentWillUnmount() {
    // TODO: this is breaking for search! Need to figure out why
    // const { index } = this.props;
    // let trans;
    // if (__CLIENT__) {
    // trans = document.getElementById(`trans${index}`).children[1]; // eslint-disable-line
    // trans.removeEventListener('click', this.fetchFootNote, true);
    // }
  }

  fetchFootNote = (event) => {
    const { loadFootNote } = this.props; // eslint-disable-line no-shadow

    if (event.target.nodeName === 'SUP' && event.target.attributes.foot_note) {
      event.preventDefault();
      loadFootNote(event.target.attributes.foot_note.value);
    }
  };

  render() {
    const { translation, index } = this.props;
    const lang = translation.languageName;
    const isArabic = lang === 'arabic';

    return (
      <Container
        id={`trans${index}`}
        className={`${isArabic && 'arabic'} translation`}
      >
        <h4 className="montserrat">
          {translation.resourceName}
        </h4>
        <h2
          className={`${isArabic
            ? 'text-right'
            : 'text-left'} text-translation times-new`}
        >
          <small className={`${lang || 'times-new'}`}>
            {translation.text}
          </small>
        </h2>
      </Container>
    );
  }
}

Translation.propTypes = {
  translation: customPropTypes.translationType.isRequired,
  index: PropTypes.number,
  loadFootNote: PropTypes.func.isRequired
};

export default connect(null, { loadFootNote })(Translation);
