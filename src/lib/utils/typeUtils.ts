import { TYPE_COLORS } from '../constants/colors';
import { IdeaType } from '../../types';

export function getTypeColor(type: IdeaType, opacity?: number) {
  const color = TYPE_COLORS[type].primary;
  return opacity ? `${color}/${opacity}` : color;
}

export function getTypeBackground(type: IdeaType) {
  return TYPE_COLORS[type].bg;
}

export function getTypeRing(type: IdeaType, opacity?: number) {
  const color = TYPE_COLORS[type].ring;
  return opacity ? `${color}/${opacity}` : color;
}