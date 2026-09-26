export interface Share { id: string; label: string; share: number; color: string; }
export function hierarchySlices(groups: Share[], branches: Share[]) {
  const total = groups.reduce((sum, group) => sum + group.share, 0);
  let angle = 0;
  const parents = groups.map((group) => {
    const start = angle;
    angle += group.share / total * 360;
    return { ...group, start, end: angle };
  });
  const christian = parents.find((group) => group.id === 'christians')!;
  let childAngle = christian.start;
  const children = branches.map((branch) => {
    const start = childAngle;
    childAngle += (christian.end - christian.start) * branch.share / 100;
    return { ...branch, start, end: childAngle, worldShare: christian.share * branch.share / 100 };
  });
  return { parents, children };
}

export function point(angle: number, radius: number) {
  const radians = angle * Math.PI / 180;
  return [radius * Math.sin(radians), -radius * Math.cos(radians)];
}

export function ringPath(start: number, end: number, inner: number, outer: number) {
  const p = (angle: number, radius: number) => point(angle, radius).map((n) => n.toFixed(3)).join(' ');
  const large = end - start > 180 ? 1 : 0;
  return `M${p(start, outer)}A${outer} ${outer} 0 ${large} 1 ${p(end, outer)}L${p(end, inner)}A${inner} ${inner} 0 ${large} 0 ${p(start, inner)}Z`;
}
