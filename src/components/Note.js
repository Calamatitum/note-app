import React, { Component } from 'react';
import { Card, Button, Tag } from 'element-react/next';
import 'element-theme-default';
import moment from 'moment';
import "./Note.css";

class Note extends Component {
	constructor(props) {
		super(props);
	}

	deleteNote() {
		this.props.onDelete();
	}

	editNote() {
		this.props.onEdit();
	}	

	render() {
		return (
			<div className="Note">	
				<Card
					className="box-card"
					header={
						<div className="clearfix">
							<span style={{ "lineHeight": "36px" }}>
								{this.props.header}
								
							</span>
							<span style={{ "float": "right" }}>
								<Button 
									type="primary" 
									icon="edit"
									onClick={this.editNote.bind(this)}>									
								</Button>
								<Button 
									type="primary" 
									icon="delete"
									onClick={this.deleteNote.bind(this)}>										
								</Button>
							</span>
						</div>			
					}
				>
					<div className="text item">
						<p>{this.props.message}</p>			
					</div>
					<div className="text item">
						{this.props.tag.map((tag) => (<Tag type="gray">{tag}</Tag>))}
						<span className="date">{moment(this.props.date).format('LTS')}</span>
					</div>								
				</Card>
				<br />
			</div>
		)
	}
}

export default Note
