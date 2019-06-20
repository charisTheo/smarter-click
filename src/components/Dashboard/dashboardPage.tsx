import React from 'react'
import _s from 'underscore.string'
import MaterialTable, { Column } from 'material-table'

import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'

import './dashboardPage.css'
import data from './../../dummyDashboardData.json'

let users: any = data.users
let defaultColumns: Array<Column> = Object.keys(users[0]).map(field => {
    let value = users[0][field]
    let typeIsNumeric = typeof value === 'number'
    let typeIsCurrency = typeIsNumeric && ( value % 1 > 0 )
    // type?: ('string' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency')
    let type = typeIsCurrency ? 'currency' : typeIsNumeric ? 'numeric' : 'string' 

    return {
        title: _s.capitalize(field),
        field,
        type,
        currencySetting: typeIsCurrency ? {locale: 'en-UK', currencyCode: 'GBP'} : {}
    } as Column
})

class DashboardPage extends React.Component {
    state = {
        columns: defaultColumns,
        data: users
    }

    render() {
        return (
            <div>
                <h3>Dashboard</h3>
                <div className="table">
                    <MaterialTable 
                        title="User details"
                        columns={this.state.columns}
                        data={this.state.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                setTimeout(() => {
                                    resolve()
                                    const data = [...this.state.data]
                                    data.push(newData)
                                    this.setState({ ...this.state, data })
                                    }, 600)
                                }),
                                onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve()
                                        const data = [...this.state.data]
                                        data[data.indexOf(oldData)] = newData
                                        this.setState({ ...this.state, data })
                                    }, 600)
                                }),
                                onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve()
                                        const data = [...this.state.data]
                                        data.splice(data.indexOf(oldData), 1)
                                        this.setState({ ...this.state, data })
                                    }, 600)
                                }),
                            }}
                            icons={{ 
                                Add: Add,
                                Edit: Edit,
                                Delete: Delete,
                                Check: Check,
                                Export: SaveAlt,
                                Filter: FilterList,
                                FirstPage: FirstPage,
                                LastPage: LastPage,
                                NextPage: ChevronRight,
                                PreviousPage: ChevronLeft,
                                Search: Search,
                                ThirdStateCheck: Remove,
                                ViewColumn: ViewColumn,
                                DetailPanel: ChevronRight,
                            }}
                        />
                </div>
            </div>
        )
    }
}

export default DashboardPage
