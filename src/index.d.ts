import * as React from 'react';

interface RgReactDatepickerProps {
    required?: boolean;
    disabled?: boolean;
    updateCallback?: (value: string | Date | null) => any;
    value?: string | Date | null;
    label?: string;
    placeholder?: string;
    topLabel?: boolean;
    widthLabel?: number;
}

export class RgReactDatepicker extends React.Component<RgReactDatepickerProps, any> {}