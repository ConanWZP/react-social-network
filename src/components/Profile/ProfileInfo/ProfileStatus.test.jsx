import React from "react";
import ProfileStatus from "./ProfileStatus";
/*import TestRenderer from 'react-test-renderer';
const TestRenderer = require('react-test-renderer');*/
import { create } from 'react-test-renderer';

describe("ProfileStatus component", () => {
    test("Status from props should be in the state", () => {
        const component = create(<ProfileStatus status='test' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('test');
    });

    test("Does span have value?", () => {
        const component = create(<ProfileStatus status='test' />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children.length).toBe(1);
    });

    test("text inside of span", () => {
        const component = create(<ProfileStatus status='test' />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('test');
    });

    test("input should be displayed in editMode", () => {
        const component = create(<ProfileStatus status='test' />);
        const root = component.root;
        let span = root.findByType('span')
        span.props.onClick();
        let input = root.findByType('input')

        expect(input.props.value).toBe('test');
    });

    test("callBack should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='test' updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
