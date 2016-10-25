import * as React from 'react'
import {CellProps} from './cells'
import {stringToValue} from '../../../../utils/valueparser'
import { Combobox } from 'react-input-enhancements'

interface State {
  value: string
}

export default class EnumCell extends React.Component<CellProps<string>, State> {

  private ref: any

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value ? this.props.value : 'standard value',
    }
  }

  render() {
    return (
      <Combobox
        ref={ref => this.ref = ref}
        value={this.state.value}
        onBlur={(e: any) => this.props.save(stringToValue(e.target.value, this.props.field))}
        onKeyDown={this.onKeyDown.bind(this)}
        options={this.props.field.enumValues}
        onSelect={(value: string) => this.setState({value})}
        autosize
      >
        {inputProps =>
          <input
            {...inputProps}
            type='text'
            placeholder='No Value'
            autoFocus
          />
        }
      </Combobox>
    )
  }

  private onKeyDown = (e: any) => {
    // filter arrow keys
    if ([38,40].includes(e.keyCode)) {
      return
    }

    e.persist()

    // this is needed in order to have the Combobox receive the key
    // event before it pops up to the Cell
    setImmediate(() => {
      this.props.onKeyDown(e)
    })
  }
}
