import { FlexBox } from '@romger/react-flex-layout';
import React from 'react';
import ReactDom from 'react-dom';
import { DatePickerInput } from 'rc-datepicker';
import classnames from 'classnames';

class RgReactDatepicker extends React.Component {
    constructor(props) {
        super(props);

        this.DATE_FORMAT_VISIBLE = 'дд.мм.гггг';
        this.DATE_FORMAT = 'DD.MM.YYYY';
        this.ERROR_EMPTY = 'Это поле обязательно для заполнения';
        this.VALIDATE_ERROR = 'Поле заполнено не корректно';
        this.state = {
            error: null,
            show: false
        };
    }

    componentDidMount() {
        this.checkOpenModal();
    }

    get iconCalendar() {
        return <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.995 2H2V3C2 4.10457 2.89543 5 4 5C5.10457 5 6 4.10457 6 3V2H12V3C12 4.10457 12.8954 5 14 5C15.1046 5 16 4.10457 16 3V2H16.005C17.107 2 18 2.895 18 3.994V16.006C18 17.107 17.108 18 16.005 18H1.995C0.893 18 0 17.106 0 16.006V3.994C0 2.893 0.892 2 1.995 2ZM12 14.001H14V12H12V14.001ZM10 14.001H8V12H10V14.001ZM4 14.001H6V12H4V14.001ZM6 10.001H4V8H6V10.001ZM8 10.001H10V8H8V10.001ZM14 10.001H12V8H14V10.001Z"
                fill="#B3BAC5"
            />
            <path
                d="M13 3V2H15V3C15 3.552 14.552 4 14 4C13.448 4 13 3.552 13 3Z"
                fill="#B3BAC5"
            />
            <path
                d="M13 1V2H15V1C15 0.448 14.552 0 14 0C13.448 0 13 0.448 13 1Z"
                fill="#B3BAC5"
            />
            <path
                d="M3 1V2H5V1C5 0.448 4.552 0 4 0C3.448 0 3 0.448 3 1Z"
                fill="#B3BAC5"
            />
            <path
                d="M3 3V2H5V3C5 3.552 4.552 4 4 4C3.448 4 3 3.552 3 3Z"
                fill="#B3BAC5"
            />
        </svg>;
    }

    /**
     * Валидация поля
     * @param {Date} value 
     */
    validataionField(value) {
        let VALIDATION_DATE_ERROR = 'Invalid date';

        if (this.props.required && value === VALIDATION_DATE_ERROR) {
            this.setState({ error: this.VALIDATE_ERROR });
            return this.props.updateCallback('');
        }
        else if (this.props.required && value !== VALIDATION_DATE_ERROR) {
            this.setState({ error: null });
        }
        return this.props.updateCallback(value === VALIDATION_DATE_ERROR ? '' : value);
    }

    /**
     * Получить объект стилей для родительского элемента
     * @param {*} prefixClass 
     * @param {*} iconSvg 
     */
    getStyleParent() {
        let style = {};
        style['base-date-picker--required'] = !!this.props.required;
        return style;
    }

    checkOpenModal() {
        this.handlerOutsideClick(this.datepickerNode, () => {
            if (!this.datepickerNode) {
                return;
            }
            let find = this.datepickerNode.getElementsByClassName('react-datepicker-component');
            if (!find || !find.length || find[0].children.length === 1) {
                return;
            }
            try {
                find[0].children[1].style.display = 'none';
            }
            catch(e) {
                return;
            }
        });
        let input = this.datepickerNode.getElementsByTagName('input');
        if (!input || !input.length) {
            return;
        }
        input[0].addEventListener('focus', () => {
            if (!this.datepickerNode) {
                return;
            }
            let find = this.datepickerNode.getElementsByClassName('react-datepicker-component');
            if (!find || !find.length || find[0].children.length === 1) {
                return;
            }
            try {
                find[0].children[1].style.display = 'block';
            }
            catch(e) {
                return;
            }
        });
    }

    /**
     * Колбэк на клик по документу, чтобы что-нибудь сделать, если кликнули за пределы элемента
     * @param evt
     */
    handlerOutsideClick(
        node,
        callbackOutside,
        removeHandler = false,
    ) {
        document.addEventListener(
            'click',
            (evt) => {
                let targetElement = evt.target;
                do {
                    if (targetElement === node || !targetElement) {
                        return;
                    }
                    targetElement = targetElement.parentNode;
                } while (targetElement);
                callbackOutside();
            },
            {
                once: !!removeHandler,
            },
        );
    }

    render() {
        const { value, label, placeholder, required, disabled, topLabel, widthLabel } = this.props;
        let styleLabel = null;
        if (widthLabel) {
            styleLabel = {
                width: `${widthLabel}px`
            };
        }
        return (
            <div 
                ref={node => this.datepickerNode = node}
                className={classnames(
                    'base-date-picker',
                    {
                        'base-date-picker--error': !!this.state.error
                    },
                    this.getStyleParent()
                )}
            >
                {
                    !!label && !!topLabel &&
                    <div className={classnames(
                        'base-date-picker__label'
                    )}>
                        {label}
                        {required ? <span>{' *'}</span> : ''}
                    </div>
                }
                <FlexBox
                    row="start center"
                    className={classnames(
                        'base-date-picker__input-wrap',
                    )}
                >
                    {
                    !!label && !topLabel &&
                        <div 
                            className={classnames(
                                'base-date-picker__label',
                                'base-date-picker__label--left'
                            )}
                            style={styleLabel}
                        >
                            {label}
                            {required ? <span>{' *'}</span> : ''}
                        </div>
                    }
                    <FlexBox
                        flex={true}
                        column="start stretch"
                        className={classnames(
                            'base-date-picker__input-position-wrap',
                        )}
                    >
                        <DatePickerInput
                            value={value}
                            disabled={disabled}
                            className={classnames(
                                'base-date-picker__input'
                            )}
                            locale='ru'
                            placeholder={this.state.show ? this.DATE_FORMAT_VISIBLE : !!placeholder ? placeholder + (required ? ' *' : '') : ''}
                            displayFormat={this.state.show || !!value ? this.DATE_FORMAT : undefined}
                            showInputButton={false}
                            showOnInputClick={true}
                            closeOnClickOutside={true}
                            onShow={() => this.setState({ show: true })}
                            onHide={() => this.setState({ show: false })}
                            onChange={(e) => this.validataionField(e)}
                        />
                        {
                            !disabled &&
                            <div
                                className={classnames(
                                    'base-date-picker__icon-calendar'
                                )}
                                onClick={() => window.setTimeout(() => ReactDom.findDOMNode(this.datepickerNode).getElementsByTagName('input')[0].click())}
                            >
                                {this.iconCalendar}
                            </div>
                        }
                        <FlexBox
                            row="flex-start flex-end"
                            className={classnames(
                                'base-date-picker__fields-error'
                            )}>
                            {
                                this.state.error
                                    ?
                                    <div
                                        className={classnames(
                                            'base-date-picker__text-overflow'
                                        )}>{this.state.error}</div>
                                    : null
                            }
                        </FlexBox>
                    </FlexBox>
                </FlexBox>
            </div>
        );
    }
}

export default RgReactDatepicker;