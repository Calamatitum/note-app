import React, { Component } from 'react';
import { Input, Button, Tag } from 'element-react/next';
import 'element-theme-default';
import './NoteForm.css';


class NoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {			
			header: '',
			noteText: '',
			dynamicTags: [],
			inputVisible: false,
			inputValue: '',
			headerIsInvalid: false,
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState(state => {
			return {
				header: nextProps.header || '',
				noteText: nextProps.message || '',
				dynamicTags: nextProps.tag || [],
			};			
		});
	}

	handleHeaderChange(value) {
		this.setState({
			header: value
		})
	}

	handleNoteTextChange(value) {
		this.setState({
			noteText: value
		})
	}

	onKeyUp(e) {
		if (e.keyCode === 13) {
			this.handleInputConfirm();
		}
	}

	onChange(value) {
		this.setState({ inputValue: value });
	}

	handleClose(index) {
		this.state.dynamicTags.splice(index, 1);
		this.forceUpdate();
	}

	showInput() {
		this.setState({ inputVisible: true }, () => {
			this.refs.saveTagInput.focus();
		});
	}

	handleInputConfirm() {
		let inputValue = this.state.inputValue;

		if (inputValue) {
			this.state.dynamicTags.push(inputValue);
		}

		this.state.inputVisible = false;
		this.state.inputValue = '';

		this.forceUpdate();
	}

	onClickSubmit() {
		let noSpaces = this.state.header.replace(/\s/g, '');

		if(!noSpaces) { //если не строка, т.е. пустая строка, не имеет символов
			this.setState({headerIsInvalid: true});
		} else {
			this.setState({
				headerIsInvalid: false, 
				header: '', 
				noteText: '', 
				dynamicTags: []
			});
			this.props.app.addNoteData(this.state.header, this.state.noteText, this.state.dynamicTags);
		}
	}

	render() {
		return (
			<div className="note-form">			
				<Input 
					placeholder="Введите заголовок"
					className={this.state.headerIsInvalid && "inputHeaderIsInvalid"}
					value={this.state.header}
					name="header"
					onChange={this.handleHeaderChange.bind(this)} 
				/>
				<Input
					className="textarea"
					type="textarea"
					autosize={{ minRows: 5, maxRows: 10}}
					placeholder='Введите текст'
					value={this.state.noteText}
					name="noteText"
					onChange={this.handleNoteTextChange.bind(this)}
				/>
				<div>
				{
					this.state.dynamicTags.map((tag, index) => {
						return (
							<Tag
								key={Math.random()}
								closable={true}
								type="gray"
								closeTransition={false}
								onClose={this.handleClose.bind(this, index)}>{tag}
							</Tag>
						)
					})
				}
				{
					this.state.inputVisible ? (
						<Input
							className="input-new-tag"
							value={this.state.inputValue}
							ref="saveTagInput"
							size="mini"
							onChange={this.onChange.bind(this)}
							onKeyUp={this.onKeyUp.bind(this)}
							onBlur={this.handleInputConfirm.bind(this)}
						/>
					) : <Button 
							className="button-new-tag" 
							size="small" 
							onClick={this.showInput.bind(this)}>+ Добавить тэг
						</Button>
				}
				</div>			
				<div>      
					<Button 
						type="primary" 
						className="ready-button"
						size="large"
						onClick={this.onClickSubmit.bind(this)}
					>Готово
					</Button>     
				</div>
				<br />				
			</div>
		)
	}
}


export default NoteForm