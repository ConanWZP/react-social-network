import React from 'react';
import styles from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {

        console.log("this:", this)
        this.setState( {
            editMode: true
        });
    }

    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (smth) => {
        this.setState({
            status: smth.currentTarget.value
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }


    render() {
        return (
            <div>
                { !this.state.editMode &&
                    <div>
                        <span onClick={ this.activateEditMode }>{this.props.status ? this.props.status : 'Добавьте статус'}</span>
                    </div>
                }
                { this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={ this.deactivateEditMode } value={this.state.status} />
                    </div>
                }
            </div>

        )
    }


}

export default ProfileStatus