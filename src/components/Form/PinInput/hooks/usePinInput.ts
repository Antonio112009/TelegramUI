'use client';

import { useCallback, useRef } from 'react';

import { Keys } from 'helpers/accessibility';
import { clamp } from 'helpers/math';
import { useCustomEnsuredControl } from 'hooks/useEnsureControl';

export enum BiometricType {
  FACEID = 'faceid',
  FINGERPRINT = 'fingerprint',
}

interface UsePinInputProps {
  pinCount: number;
  value?: number[];
  onChange?(this: void, value: number[]): void;
  onBiometricAuth?(this: void): void;
  biometricType?: BiometricType;
}

const BIOMETRIC_AUTH_BUTTON_VALUE = 'BiometricAuth';
export const DEFAULT_PINS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  BIOMETRIC_AUTH_BUTTON_VALUE,
  0,
  Keys.BACKSPACE,
];

export const getAvailablePins = (biometricType?: BiometricType) => {
  const pins = [...DEFAULT_PINS];

  if (!biometricType) {
    const biometricIndex = pins.indexOf(BIOMETRIC_AUTH_BUTTON_VALUE);
    if (biometricIndex !== -1) {
      pins.splice(biometricIndex, 1);
    }
  }

  return pins;
};

export const usePinInput = ({
  pinCount,
  value: valueProp = [],
  onChange,
  onBiometricAuth,
  biometricType = undefined,
}: UsePinInputProps) => {
  const PINS = getAvailablePins(biometricType);
  const inputRefsRef = useRef<HTMLLabelElement[]>([]);
  const inputRefs = inputRefsRef.current;
  const [value, setValue] = useCustomEnsuredControl({
    defaultValue: valueProp,
    onChange,
  });

  const focusByIndex = (index: number) => {
    requestAnimationFrame(() => inputRefs[index]?.focus());
  };

  const setValueByIndex = (index: number, newValue: number) => {
    setValue((prev) => {
      const nextValue = [...prev];
      nextValue[index] = newValue;
      return nextValue;
    });
  };

  const removeLastValue = (currentIndex: number) => {
    setValue((prev) => prev.slice(0, -1));
    focusByIndex(currentIndex - 1);
  };

  const handleClickValue = useCallback(
    (enteredValue: number) => {
      const lastIndex = clamp(value.length, 0, pinCount - 1);
      setValueByIndex(lastIndex, enteredValue);
      focusByIndex(lastIndex + 1);
       
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, pinCount],
  );

  const handleClickBackspace = useCallback(() => {
    removeLastValue(value.length - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleBiometricAuth = useCallback(() => {
    if (onBiometricAuth) {
      onBiometricAuth();
    }
  }, [onBiometricAuth]);

  const handleButton = useCallback((index: number, button: string) => {
    const numButton = Number(button);
    if (!Number.isNaN(numButton) && PINS.includes(numButton)) {
      setValueByIndex(index, numButton);
      focusByIndex(index + 1);
    }

    switch (button) {
      case Keys.BACKSPACE:
        removeLastValue(index);
        break;

      case Keys.ARROW_LEFT:
        focusByIndex(index - 1);
        break;

      case Keys.ARROW_RIGHT:
        focusByIndex(index + 1);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setInputRefByIndex = useCallback(
    (index: number, ref: HTMLLabelElement | null) => {
      if (!ref) {
        return;
      }

      inputRefs[index] = ref;
       
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onElementClick = useCallback(
    (element: string | number) => {
      if (element === Keys.BACKSPACE) {
        handleClickBackspace();
        return;
      }

      if (element === BIOMETRIC_AUTH_BUTTON_VALUE) {
        handleBiometricAuth();
        return;
      }

      handleClickValue(Number(element));
    },
    [handleClickValue, handleClickBackspace, handleBiometricAuth],
  );

  return {
    value,
    setInputRefByIndex,
    onElementClick,
    handleButton,
    PINS,
  };
};
