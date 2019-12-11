import { connect } from 'react-redux'
import VScrollMenu from '../VScrollMenu'
import HScrollMenu from '../HScrollMenu'
import uiController from '../Controllers/UIController'
import { activateSubMenu } from '../actions'

import MediaCustomMenu from '../Templates/MediaCustom/MediaCustomMenu'

const mapStateToProps = (state) => {
    var activeApp = state.activeApp
    var menu = state.ui[activeApp].menu
    var theme = state.theme
    var data = menu.map((command) => {
        var link =  state.ui[activeApp].displayLayout
        if (command.subMenu) {
            link = '/inapplist'
        }
        return {
            cmdID: command.cmdID,
            name: command.menuName,
            image: command.cmdIcon ? command.cmdIcon.value : undefined,
            imageType: command.cmdIcon ? command.cmdIcon.imageType : undefined,
            isTemplate: command.cmdIcon ? command.cmdIcon.isTemplate : undefined,
            appID: activeApp,
            link: link,
            menuID: command.menuID,
            activeApp: activeApp,
            theme: state.theme,
            ui: state.ui     
        }
    })
    return {
        data: data, theme: theme,           
        activeApp: activeApp,
        theme: state.theme,
        ui: state.ui    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelection: (appID, cmdID, menuID) => {
            if (menuID) {
                dispatch(activateSubMenu(appID, menuID))
            }
            else if (cmdID) {
                uiController.onSystemContext("MAIN", appID)
                uiController.onCommand(cmdID, appID)
            }
        }
    }
}

export const VMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(VScrollMenu)

export const HMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(HScrollMenu)

export const CMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaCustomMenu)

export default VMenu