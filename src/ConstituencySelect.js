import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import React, { Component } from 'react';

export default function ConstituencySelect(props){
    return  <FormControl className="form-control">
                <InputLabel htmlFor="ukarea">Please Select Constituency?</InputLabel>
                <Select 
                className={props.SelectClass}
                value={props.ukarea}
                onChange={props.handleChange}
                name="ukarea"
                autoWidth={true}
                native>
                    <option value=""/>
                    {props.constituencies.map((constituency,index) =>{
                        const ukarea = constituency.get('c.ukarea')
                        return(
                            <option value={ukarea} key={ukarea}>{ukarea}</option>
                        )
                    })}
                </Select>
            </FormControl>;
}