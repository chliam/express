/**
 *  TabBar
 */
'use strict'

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import React, {Component} from 'react'

import TabBarItem from './TabBarItem';
import MomEnv from './../../config/Environment';

export default class TabBar extends Component {
    static Item = TabBarItem;

    static defaultProps = {
        defaultPage: 0,
        navFontSize: 10,
        navTextColor: '#999999',
        navTextColorSelected: MomEnv.MAIN_COLOR,
    };

    static propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
        defaultPage: React.PropTypes.number,
        navFontSize: React.PropTypes.number,
        navTextColor: React.PropTypes.string,
        navTextColorSelected: React.PropTypes.string,
        onItemSelected: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.visibles = [false,true,false,false,false];
        this.state = {
            selectedIndex: 1,
        }
    }

    getBadge(child) {
        let value = 0;
        if (typeof child.props.badge == 'number') {
            value = child.props.badge;
        }

        if (child.props.badge || value != 0) {
          const _badgeStyle = (typeof child.props.badge == 'number') ? styles.badgeWithNumber : styles.badgeNoNumber;

          let valueStr = '';
          if (value > 99) {
              valueStr = 99;
          } else {
              valueStr = child.props.badge;
          }

          return (
              <View style={[_badgeStyle, this.props.badgeStyle]}>
                  <Text style={styles.badgeText}>{valueStr}</Text>
              </View>
          );
        }
    }
	//放大按钮
	_stressPoint (child){
		return child.props.point;
	}

    render() {
        let children = this.props.children;
        if (!children.length) {
            throw new Error("at least two child component are needed.");
        }

        // 底部tab按钮组
        let navs = [];

        const contentViews = children.map(
            (child,i) => {
                //const imgSrc = this.state.selectedIndex == i ? child.props.selectedIcon : child.props.icon;
                const imgSrc = child.props.icon;
                const color = this.state.selectedIndex == i ? this.props.navTextColorSelected : this.props.navTextColor;

                navs[i] = (
                    <TouchableHighlight
                        key={i}
                        underlayColor={'transparent'}
                        style={styles.navItem}
                        onPress={() => {
                            if (child.props.onPress) {
                                child.props.onPress();
                            }

                            this.update(i);
                        }}>
                        <View style={styles.center}>
                            <Image style={[styles.navImage, {tintColor:color}]} resizeMode='center' source={imgSrc}/>
                            <Text style={[styles.navText,{color: color,fontSize: this.props.navFontSize}]}>
                                {child.props.title}
                            </Text>
                            {this.getBadge(child)}
                        </View>
                    </TouchableHighlight>
                );

                if (!this.visibles[i]) {
                    return null;
                } else {
                    const style = this.state.selectedIndex == i ? [styles.base] : [styles.base,styles.gone];
                    return (
                        <View
                            key={'view_' + i}
                            style={style}>
                            {child}
                        </View>
                    );
                }
            }
        );

        return (
            <View style={[styles.container,this.props.style]}>
                <View style={styles.content}>
                    {contentViews}
                </View>

                <View style={styles.horizonLine}/>

                <View style={styles.nav}>
                    {navs}
                </View>
            </View>
        );
    }

    componentDidMount() {
        let page = this.props.defaultPage;

        if (page >= this.props.children.length || page < 0){
            page = 0;
        }

        this.update(page);
    }

    update(index) {
        this.visibles[index] = true;
        this.setState({
            selectedIndex: index,
        });

        if (this.props.onItemSelected) {
            this.props.onItemSelected(index);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        overflow: 'hidden',
    },
    content: {
        flex: 1
    },
    base: {
        position: 'absolute',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    gone: {
        top: Dimensions.get('window').height,
        bottom: -Dimensions.get('window').height,
    },
    nav: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        backgroundColor: MomEnv.TABBAR_BG_COLOR,
    },
    navItem: {
        flex: 1,
        padding:6,
        alignItems: 'center',
    },
    center: {
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navImage: {
        width: 18,
        height: 18,
        marginBottom: 2,
        marginTop:4
    },
    navImageChange: {
		// top: -28,
		// width: 18,
		// height: 18,
		// marginBottom: 2,
		// position: 'absolute',
		// borderRadius: 28,
		// borderWidth: 3,
		// borderColor: '#fff',
		// alignSelf: 'center'
	},
    navTextChange: {
        marginTop: 30,
	    fontSize: 11,
	    alignSelf: 'center'
    },
	navText: {
		marginTop: 0,
        alignSelf: 'center',
	},
    horizonLine: {
        backgroundColor: '#CCCCCC',
        height: 1,
        width: Dimensions.get('window').width,
    },
    badgeNoNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 0,
        left: 36,
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#ffffff',
        backgroundColor: '#ff0000',
    },
    badgeWithNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 0,
        left: 36,
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffffff',
        backgroundColor: '#ff0000',
    },
    badgeText: {
        alignSelf: 'center',
        fontSize: 11,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
