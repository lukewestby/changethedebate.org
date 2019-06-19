const hueToRgb = (v1: number, v2: number, vh: number) => {
  if (vh < 0) vh += 1
  if (vh > 1) vh -= 1
  if ((6 * vh) < 1) return v1 + (v2 - v1) * 6 * vh
  if ((2 * vh) < 1) return v2
  if ((3 * vh) < 2) return v1 + (v2 - v1) * ((2 / 3 - vh) * 6)
  return v1
}

const luminance_x = (x: number) => {
  return x <= 0.03928 ?
    x / 12.92 :
    Math.pow((x + 0.055) / 1.055, 2.4)
}

export default class Color {
  private _luminance: number | null

  private constructor(
    private red: number,
    private green: number,
    private blue: number,
    private alpha: number,
  ) {
    this._luminance = null
  }

  public static fromRgba(
    r: number,
    g: number,
    b: number,
    a: number,
  ) {
    return new Color(r, g, b, a)
  }

  public static fromHsla(
    h: number,
    s: number,
    l: number,
    a: number,
  ) {
    let h2 = h + 0.5
    if (h2 > 1) h2 -= 1
    if (s === 0) return Color.fromRgba(l, l, l, a)
    const v2 = l < 0.5 ? l * (1 + s) : (l + s) - (s * l)
    const v1 = 2 * l - v2
    return Color.fromRgba(
      hueToRgb(v1, v2, h2 + 1/3),
      hueToRgb(v1, v2, h2),
      hueToRgb(v1, v2, h2 - 1/3),
      a
    )
  }

  public static white = Color.fromRgba(1, 1, 1, 1)

  public static contrast(
    left: Color,
    right: Color,
  ) {
    const l1 = left.luminance
    const l2 = right.luminance
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05)
  }

  public get luminance(): number {
    if (this._luminance === null) {
      const r = luminance_x(this.red)
      const g = luminance_x(this.green)
      const b = luminance_x(this.blue)
      this._luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    return this._luminance
  }
}