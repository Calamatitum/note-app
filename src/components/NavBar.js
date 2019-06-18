import React, { Component } from 'react';
import { Menu, Input, Button } from 'element-react/next';
import 'element-theme-default';
import "./NavBar.css"


class NavBar extends Component {
        constructor(props) {
                super(props);                
        }

        showFilteredData(str) {
                let noSpaces = str.replace(/\s/g, '');

                if(!noSpaces) {
                        this.props.onSearch('');
                } else {
                        this.props.onSearch(str.toLowerCase());
                }                
        }        

	render() {
		return (
			<div className="NavBar">
				<Menu 
                                        theme="light"  
                                        className="el-menu-demo" 
                                        mode="horizontal"
                                >        			
                			<Menu.Item index="1">
                				<Input 
                					placeholder="Поиск" 
                					icon="search"
                					className="inputSearch"        	
                                                        onChange={this.showFilteredData.bind(this)}				
                				/>
                			</Menu.Item>       		
                		</Menu>			
			</div>			
		)
	}
}

export default NavBar