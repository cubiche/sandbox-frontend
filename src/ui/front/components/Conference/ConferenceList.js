import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import { List } from 'antd';
import App from "../../../../application";
import ConferenceItem from "./ConferenceItem";

const styles = `    
    .conference-item {
        margin-bottom: 80px !important;     
    }
`

class ConferenceList extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetch();
    }

    render() {
        const { conferences, isLoading } = this.props;

        return (
            <div>
                <style jsx="true">{styles}</style>
                <h2><FormattedMessage id='title.events' defaultMessage='Upcoming Events' /></h2>
                <List
                    id="Conferences"
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={conferences}
                    loading={isLoading}
                    locale={{ emptyText: '' }}
                    renderItem={conference => (
                        <List.Item className="conference-item">
                            <ConferenceItem key={conference.id} conference={conference} />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

const actions = App.actions.conference.list;
const selectors = App.selectors.conference.list;

const mapStateToProps = (state) => ({
    conferences: selectors.all(state),
    isLoading: selectors.isLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(actions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceList)