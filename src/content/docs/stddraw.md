---
title: StdDraw 中文完整文档
description: Princeton StdDraw 绘图库完整中文参考文档，包含使用指南、字段说明与方法 API。
order: 2
draft: false
---

> 原始文档：Princeton `StdDraw` Javadoc（由 Javadoc 11.0.25 于 2026-08-21 生成）<br>
> 本文为上传网页 `StdDraw.htm` 的完整中文翻译版。类名、方法名、参数名、常量名和代码保持原样。

## 类 StdDraw

**继承关系：** `Object` → `StdDraw`

**实现的所有接口：** `ActionListener`、`KeyListener`、`MouseListener`、`MouseMotionListener`、`EventListener`

```java
public final class StdDraw
extends Object
implements ActionListener, MouseListener, MouseMotionListener, KeyListener
```

`StdDraw` 类提供了一组静态方法，让程序能够创建绘图。它采用一个简单的图形模型，可以在计算机窗口中绘制由点、线、正方形、圆以及其他几何图形组成的图像，并将绘图保存到文件中。标准绘图库还支持文本、颜色、图片和动画，以及通过键盘和鼠标进行用户交互。

### 入门

要使用这个类，Java classpath 中必须包含 `StdDraw.class`。如果你使用了官方自动安装程序，那么通常已经配置好了。否则，可以下载 [stdlib.jar](https://introcs.cs.princeton.edu/java/code/stdlib.jar) 并将其加入 Java classpath，或者下载 [StdDraw.java](https://introcs.cs.princeton.edu/java/stdlib/StdDraw.java) 并将其副本放在当前工作目录中。

现在，将下面这个简短程序复制并粘贴到编辑器中：

```java
public class TestStdDraw {
    public static void main(String[] args) {
        StdDraw.setPenRadius(0.05);
        StdDraw.setPenColor(StdDraw.BLUE);
        StdDraw.point(0.5, 0.5);
        StdDraw.setPenColor(StdDraw.MAGENTA);
        StdDraw.line(0.2, 0.2, 0.8, 0.2);
    }
}
```

如果编译并运行这个程序，你应该会看到一个窗口，其中有一条较粗的品红色线段和一个蓝色点。这个程序展示了标准绘图中两类最主要的方法：一类负责绘制几何图形，另一类负责控制绘图参数。`StdDraw.line()` 和 `StdDraw.point()` 分别绘制线段和点；`StdDraw.setPenRadius()` 和 `StdDraw.setPenColor()` 则控制线条粗细和颜色。

### 点和线

可以使用以下方法绘制点和线段：

- `point(double x, double y)`
- `line(double x1, double y1, double x2, double y2)`

x、y 坐标必须位于绘图区内（默认情况下为 0 到 1），否则点和线段将不可见。

### 正方形、圆、矩形和椭圆

可以使用以下方法绘制正方形、圆、矩形和椭圆：

- `circle(double x, double y, double radius)`
- `ellipse(double x, double y, double semiMajorAxis, double semiMinorAxis)`
- `square(double x, double y, double halfLength)`
- `rectangle(double x, double y, double halfWidth, double halfHeight)`

这些方法都以图形的位置和大小作为参数。图形的位置始终由其**中心**的 x、y 坐标指定。圆的大小由半径指定；椭圆的大小由半长轴和半短轴的长度指定；正方形或矩形的大小则由半宽或半高指定。正方形和矩形采用这种参数约定，是为了与圆和椭圆保持一致，但对于刚接触的人来说可能不太符合直觉。

上面的方法只绘制给定图形的轮廓。以下方法用于绘制实心版本：

- `filledCircle(double x, double y, double radius)`
- `filledEllipse(double x, double y, double semiMajorAxis, double semiMinorAxis)`
- `filledSquare(double x, double y, double radius)`
- `filledRectangle(double x, double y, double halfWidth, double halfHeight)`

### 圆弧

可以使用以下方法绘制圆弧：

- `arc(double x, double y, double radius, double angle1, double angle2)`

圆弧来自一个以 `(x, y)` 为圆心、半径为指定值的圆，并从 `angle1` 延伸到 `angle2`。按照约定，角度采用**极角**表示，也就是从 x 轴起逆时针旋转的角度，单位为度。例如，`StdDraw.arc(0.0, 0.0, 1.0, 0, 90)` 会绘制单位圆上从 3 点钟方向（0°）到 12 点钟方向（90°）的一段圆弧。

### 多边形

可以使用以下方法绘制多边形：

- `polygon(double[] x, double[] y)`
- `filledPolygon(double[] x, double[] y)`

多边形中的各个点为 `(x[i], y[i])`。例如，下面的代码片段绘制一个实心菱形，其四个顶点分别为 `(0.1, 0.2)`、`(0.2, 0.3)`、`(0.3, 0.2)` 和 `(0.2, 0.1)`：

```java
double[] x = { 0.1, 0.2, 0.3, 0.2 };
double[] y = { 0.2, 0.3, 0.2, 0.1 };
StdDraw.filledPolygon(x, y);
```

### 画笔大小

画笔是圆形的，因此当你把画笔半径设置为 *r* 并绘制一个点时，得到的是半径为 *r* 的圆。同时，线条宽度为 `2r`，并具有圆形端点。默认画笔半径为 0.002，而且不会受到坐标缩放的影响。这个默认半径大约是默认画布宽度的 1/500，因此，如果在水平线或垂直线上均匀绘制 200 个点，你还能看出一个个独立的圆；但如果绘制 250 个这样的点，结果看起来就会像一条连续的线。

- `setPenRadius(double radius)`

例如，`StdDraw.setPenRadius(0.01)` 会让线条粗细和点的大小变成默认值 0.002 的 5 倍。如果想绘制具有最小可能半径的点（在典型显示器上为 1 个像素），请将画笔半径设置为 0.0。

### 画笔颜色

所有几何图形（例如点、线和圆）都使用当前画笔颜色绘制。默认颜色为黑色。可以使用以下方法更改画笔颜色：

- `setPenColor(int red, int green, int blue)`
- `setPenColor(Color color)`

第一个方法允许使用 RGB 颜色系统指定颜色。原文还提供了一个 [color picker](http://johndyer.name/lab/colorpicker/) 以方便寻找所需颜色。

第二个方法允许使用 Java `java.awt` 包中定义的 `Color` 数据类型指定颜色。标准绘图库预定义了许多颜色，包括 `BLACK`、`WHITE`、`RED`、`GREEN` 和 `BLUE`。例如，`StdDraw.setPenColor(StdDraw.RED)` 会将画笔颜色设置为红色。

### 窗口标题

默认情况下，标准绘图窗口的标题为 `"Standard Draw"`。可以使用以下方法修改标题：

- `setTitle(String windowTitle)`

该方法会把标准绘图窗口标题设置为指定字符串。

### 画布大小

默认情况下，所有绘图都在一个 512×512 的画布中完成。画布不包括窗口标题栏和窗口边框。可以使用以下方法修改画布大小：

- `setCanvasSize(int width, int height)`

该方法会把画布大小设置为 `width × height` 像素，同时使用默认背景色（白色）清除当前绘图。通常，这个方法只在程序刚开始时调用一次。例如，`StdDraw.setCanvasSize(800, 800)` 会把画布大小设置为 800×800 像素。

### 画布缩放与坐标系

默认情况下，所有绘图都发生在单位正方形中，左下角为 `(0, 0)`，右上角为 `(1, 1)`。可以使用以下方法修改默认坐标系：

- `setXscale(double xmin, double xmax)`
- `setYscale(double ymin, double ymax)`
- `setScale(double min, double max)`

参数表示画布中要显示的最小和最大 x 坐标或 y 坐标。例如，如果希望使用默认坐标系但在周围保留一点边距，可以调用 `StdDraw.setScale(-.05, 1.05)`。

这些方法只改变之后绘图命令所使用的坐标系，不会影响之前已经完成的绘图。它们也不会改变画布的像素尺寸。因此，如果 x 轴和 y 轴的缩放比例不同，正方形会显示为矩形，圆会显示为椭圆。

### 文本

可以使用以下方法给绘图添加文本注释：

- `text(double x, double y, String text)`
- `text(double x, double y, String text, double degrees)`
- `textLeft(double x, double y, String text)`
- `textRight(double x, double y, String text)`

前两个方法使用当前字体绘制指定文本，并使文本中心位于 `(x, y)`。第二个方法还可以旋转文本。最后两个方法分别让文本在 `(x, y)` 处左对齐或右对齐。

默认字体是 16 磅 Sans Serif 字体。可以使用以下方法修改字体：

- `setFont(Font font)`

要指定字体，需要使用 Java `java.awt` 包中定义的 `Font` 数据类型。它允许选择字体名称、大小和样式。例如，下面的代码片段把字体设置为 60 磅 Arial 粗体。`import` 语句使你可以直接使用 `Font`，而不必写完整限定名 `java.awt.Font`。

```java
import java.awt.Font;
...
Font font = new Font("Arial", Font.BOLD, 60);
StdDraw.setFont(font);
StdDraw.text(0.5, 0.5, "Hello, World");
```

### 图像

可以使用以下方法向绘图中添加图像：

- `picture(double x, double y, String filename)`
- `picture(double x, double y, String filename, double degrees)`
- `picture(double x, double y, String filename, double scaledWidth, double scaledHeight)`
- `picture(double x, double y, String filename, double scaledWidth, double scaledHeight, double degrees)`

这些方法会绘制指定图像，并使其中心位于 `(x, y)`。图像必须采用受支持的文件格式（通常包括 JPEG、PNG、GIF、TIFF 和 BMP）。图像默认按照原始像素尺寸显示，与坐标系无关。也可以选择将图像逆时针旋转指定角度，或者重新缩放，使其恰好适配某个边界框。

### 保存到文件

可以通过菜单中的 *File → Save* 选项把图像保存到文件，也可以在程序中使用以下方法：

- `save(String filename)`

绘图可以保存为受支持的文件格式（通常包括 JPEG、PNG、GIF、TIFF 和 BMP）。

### 文件格式

`StdDraw` 类支持读取和写入 `javax.imageio` 所支持的任何图像格式（通常包括 JPEG、PNG、GIF、TIFF 和 BMP）。JPEG、PNG、GIF、TIFF 和 BMP 对应的典型扩展名分别为 `.jpg`、`.png`、`.gif`、`.tif` 和 `.bmp`。

对于只包含几何图形的绘图，官方建议使用 PNG；对于包含图片的绘图，建议使用 JPEG。JPEG 文件格式不支持透明背景。

### 清空画布

可以使用以下方法清空整个绘图画布：

- `clear()`
- `clear(Color color)`

第一个方法使用默认背景色（白色）清空画布；第二个方法允许指定背景色。例如，`StdDraw.clear(StdDraw.LIGHT_GRAY)` 会使用一种灰色清空画布。若要让背景透明，请调用 `StdDraw.clear(StdDraw.TRANSPARENT)`。

### 计算机动画与双缓冲

双缓冲是标准绘图最强大的功能之一，可以用于制作计算机动画。以下方法控制对象的绘制方式：

- `enableDoubleBuffering()`
- `disableDoubleBuffering()`
- `show()`
- `pause(int t)`

默认情况下，双缓冲处于禁用状态。这意味着只要调用 `point()`、`line()` 等绘图方法，结果就会立刻显示在屏幕上。

调用 `enableDoubleBuffering()` 启用双缓冲后，所有绘图都会发生在**离屏画布（offscreen canvas）**上，而离屏画布本身并不会显示。只有调用 `show()` 时，绘图内容才会从离屏画布复制到屏幕画布（onscreen canvas），并显示在标准绘图窗口中。你可以把双缓冲理解为：先收集所有要求绘制的线、点、形状和文本，然后在需要时一次性**同时**显示出来。

双缓冲最重要的用途是制作计算机动画：通过快速显示一系列静态图像，产生运动的错觉。制作动画时，重复以下四个步骤：

1. 清空离屏画布。
2. 在离屏画布上绘制对象。
3. 将离屏画布复制到屏幕画布。
4. 等待一小段时间。

`clear()`、`show()` 和 `pause(int t)` 分别用于完成第 1、第 3 和第 4 步。

例如，下面的代码片段会让两个小球沿圆周运动：

```java
StdDraw.setScale(-2.0, +2.0);
StdDraw.enableDoubleBuffering();

for (double t = 0.0; true; t += 0.02) {
    double x = Math.sin(t);
    double y = Math.cos(t);
    StdDraw.clear();
    StdDraw.filledCircle(x, y, 0.1);
    StdDraw.filledCircle(-x, -y, 0.1);
    StdDraw.show();
    StdDraw.pause(20);
}
```

如果不使用双缓冲，小球在移动时会产生闪烁。

### 键盘与鼠标输入

标准绘图库对键盘和鼠标输入提供了非常基础的支持。它远不如大多数用户界面库强大，但也简单得多。可以使用以下方法捕获鼠标事件：

- `isMousePressed()`
- `mouseX()`
- `mouseY()`

第一个方法告诉你鼠标按钮当前是否正被按下；后两个方法返回鼠标当前位置的 x、y 坐标，使用的坐标系与画布相同（默认是单位正方形）。这些方法通常应放在动画循环中使用，并在每次轮询鼠标当前状态之前等待一小段时间。

可以使用以下方法捕获键盘事件：

- `hasNextKeyTyped()`
- `nextKeyTyped()`
- `isKeyPressed(int keycode)`

如果用户连续键入许多按键，它们会被保存在一个列表中，直到程序逐个处理。第一个方法用于判断用户是否键入了尚未被程序处理的按键；第二个方法返回用户键入的下一个尚未处理的按键，并把它从已保存按键列表中移除；第三个方法用于判断某个按键当前是否正被按下。

### 访问控制参数

可以使用以下方法获取当前画笔颜色、背景颜色、画笔半径和字体：

- `getPenColor()`
- `getBackgroundColor()`
- `getPenRadius()`
- `getFont()`

当你想临时修改某个控制参数，并在稍后将它恢复为原来的值时，这些方法非常有用。

### 边界情况

以下是一些需要注意的边界情况：

- 允许绘制完全位于画布之外或部分位于画布之外的对象。不过，只有落在画布内部的部分才可见。
- 由于浮点数问题，如果对象的 x 或 y 坐标远远超出画布范围（例如从 `(0.5, -10^308)` 到 `(0.5, 10^308)` 的线段），即使其中一部分理论上应该位于画布内，也可能无法显示。
- 任何方法如果接收到 `null` 参数，都会抛出 `IllegalArgumentException`。
- 任何方法如果接收到 `Double.NaN`、`Double.POSITIVE_INFINITY` 或 `Double.NEGATIVE_INFINITY` 参数，都会抛出 `IllegalArgumentException`。

### 性能技巧

标准绘图库能够绘制大量数据。下面是一些技巧和建议：

- 对包含大量对象的静态绘图使用**双缓冲**。也就是说，在一系列绘图命令之前调用 `enableDoubleBuffering()`，全部绘制完成后再调用 `show()`。在许多计算机系统上，一边创建复杂绘图一边持续刷新显示，效率可能低得令人无法接受。
- 绘制计算机动画时，每一帧只调用一次 `show()`，不要在每绘制一个对象之后都调用一次。
- 如果多次使用同一个文件名调用 `picture()`，Java 会缓存该图像文件，因此不会在每次调用时都承担重新读取文件的开销。
- 默认情况下，`StdDraw` 会针对显示质量优化渲染。若要针对速度优化，请调用 `setRenderingSpeed()`。

### 已知缺陷和问题

- 如果图像中心点 `(x, y)` 位于画布之外，`picture()` 系列方法可能不会绘制图像中本应落在画布内部的那一部分。这个问题只会出现在某些系统上。

### 参考资料

如需更多文档，请参阅 Robert Sedgewick 和 Kevin Wayne 所著 *Computer Science: An Interdisciplinary Approach* 的 [Section 1.5](https://introcs.cs.princeton.edu/15inout)。

**作者：** Robert Sedgewick、Kevin Wayne

---

## 字段摘要

| 修饰符和类型 | 字段 | 说明 |
|---|---|---|
| `static Color` | `AQUA` | 水绿色（0, 255, 255）。 |
| `static Color` | `BLACK` | 黑色（0, 0, 0）。 |
| `static Color` | `BLUE` | 蓝色（0, 0, 255）。 |
| `static Color` | `BOOK_BLUE` | 《Introduction to Programming in Java》中使用的蓝色。它对应 Pantone 300U，RGB 值约为（9, 90, 166）。 |
| `static Color` | `BOOK_LIGHT_BLUE` | 《Introduction to Programming in Java》中使用的浅蓝色。RGB 值约为（103, 198, 243）。 |
| `static Color` | `BOOK_RED` | 《Algorithms, 4th edition》中使用的红色。它对应 Pantone 1805U，RGB 值约为（150, 35, 31）。 |
| `static Color` | `CYAN` | 青色（0, 255, 255）。 |
| `static Color` | `DARK_GRAY` | 深灰色（64, 64, 64）。 |
| `static Color` | `FUCHSIA` | 紫红色（255, 0, 255）。 |
| `static Color` | `GRAY` | 灰色（128, 128, 128）。 |
| `static Color` | `GREEN` | 绿色（0, 128, 0）。 |
| `static Color` | `LIGHT_GRAY` | 浅灰色（192, 192, 192）。 |
| `static Color` | `LIME` | 亮绿色（0, 255, 0）。 |
| `static Color` | `MAGENTA` | 品红色（255, 0, 255）。 |
| `static Color` | `MAROON` | 栗色（128, 0, 0）。 |
| `static Color` | `NAVY` | 海军蓝（0, 0, 128）。 |
| `static Color` | `OLIVE` | 橄榄色（128, 128, 0）。 |
| `static Color` | `ORANGE` | 橙色（255, 200, 0）。 |
| `static Color` | `PINK` | 粉色（255, 175, 175）。 |
| `static Color` | `PRINCETON_ORANGE` | 普林斯顿大学视觉标识中使用的橙色。它对应 PMS 158，RGB 值约为（245, 128, 37）。 |
| `static Color` | `PURPLE` | 紫色（128, 0, 128）。 |
| `static Color` | `RED` | 红色（255, 0, 0）。 |
| `static Color` | `SILVER` | 银色（192, 192, 192）。 |
| `static Color` | `TEAL` | 蓝绿色（0, 128, 128）。 |
| `static Color` | `TRANSPARENT` | 100% 透明的颜色，用于透明背景。 |
| `static Color` | `WHITE` | 白色（255, 255, 255）。 |
| `static Color` | `YELLOW` | 黄色（255, 255, 0）。 |

## 方法摘要

| 修饰符和类型 | 方法 | 说明 |
|---|---|---|
| `void` | `actionPerformed ( ActionEvent event)` | 此方法不能被直接调用。 |
| `static void` | `addRenderingHints ( RenderingHints hints)` | 将指定的渲染提示添加到当前渲染提示中。 |
| `static void` | `arc (double x, double y, double radius, double angle1, double angle2)` | 绘制一段以 `(x, y)` 为圆心、半径为指定值、从 `angle1` 到 `angle2`（单位：度）的圆弧。 |
| `static void` | `circle (double x, double y, double radius)` | 绘制一个以 `(x, y)` 为圆心、半径为指定值的圆。 |
| `static void` | `clear ()` | 使用默认背景色（白色）清空屏幕。 |
| `static void` | `clear ( Color color)` | 使用指定背景色清空屏幕。 |
| `static void` | `close ()` | 关闭标准绘图窗口。 |
| `static void` | `disableDoubleBuffering ()` | 禁用双缓冲。 |
| `static void` | `ellipse (double x, double y, double semiMajorAxis, double semiMinorAxis)` | 绘制一个以 `(x, y)` 为中心、具有指定半长轴和半短轴的椭圆。 |
| `static void` | `enableDoubleBuffering ()` | 启用双缓冲。 |
| `static void` | `filledCircle (double x, double y, double radius)` | 绘制一个以 `(x, y)` 为圆心、半径为指定值的实心圆。 |
| `static void` | `filledEllipse (double x, double y, double semiMajorAxis, double semiMinorAxis)` | 绘制一个以 `(x, y)` 为中心、具有指定半长轴和半短轴的实心椭圆。 |
| `static void` | `filledPolygon (double[] x, double[] y)` | 绘制一个实心多边形，其顶点依次为 `(x₀, y₀)`、`(x₁, y₁)`、……、`(xₙ₋₁, yₙ₋₁)`。 |
| `static void` | `filledRectangle (double x, double y, double halfWidth, double halfHeight)` | 绘制一个以 `(x, y)` 为中心、大小为指定值的实心矩形。 |
| `static void` | `filledSquare (double x, double y, double halfLength)` | 绘制一个以 `(x, y)` 为中心、大小为指定值的实心正方形。 |
| `static Color` | `getBackgroundColor ()` | 返回当前背景颜色。 |
| `static Font` | `getFont ()` | 返回当前字体。 |
| `static Color` | `getPenColor ()` | 返回当前画笔颜色。 |
| `static double` | `getPenRadius ()` | 返回当前画笔半径。 |
| `static RenderingHints` | `getRenderingHints ()` | 返回当前渲染提示的一个副本。 |
| `static boolean` | `hasNextKeyTyped ()` | 如果用户已经键入了一个尚未处理的按键，则返回 `true`。 |
| `static boolean` | `isKeyPressed (int keycode)` | 如果给定按键当前正被按下，则返回 `true`。 |
| `static boolean` | `isMousePressed ()` | 如果鼠标当前正被按下，则返回 `true`。 |
| `void` | `keyPressed ( KeyEvent event)` | 此方法不能被直接调用。 |
| `void` | `keyReleased ( KeyEvent event)` | 此方法不能被直接调用。 |
| `void` | `keyTyped ( KeyEvent event)` | 此方法不能被直接调用。 |
| `static void` | `line (double x0, double y0, double x1, double y1)` | 绘制从 `(x₀, y₀)` 到 `(x₁, y₁)` 的线段。 |
| `static void` | `main ( String [] args)` | 测试客户端。 |
| `void` | `mouseClicked ( MouseEvent event)` | 此方法不能被直接调用。 |
| `void` | `mouseDragged ( MouseEvent event)` | 此方法不能被直接调用。 |
| `void` | `mouseEntered ( MouseEvent event)` | 此方法不能被直接调用。 |
| `void` | `mouseExited ( MouseEvent event)` | 此方法不能被直接调用。 |
| `void` | `mouseMoved ( MouseEvent event)` | 此方法不能被直接调用。 |
| `void` | `mousePressed ( MouseEvent event)` | 此方法不能被直接调用。 |
| `void` | `mouseReleased ( MouseEvent event)` | 此方法不能被直接调用。 |
| `static double` | `mouseX ()` | 返回鼠标的 x 坐标。 |
| `static double` | `mouseY ()` | 返回鼠标的 y 坐标。 |
| `static char` | `nextKeyTyped ()` | 返回用户键入的下一个、尚未被程序处理的按键。 |
| `static void` | `pause (int t)` | 暂停 `t` 毫秒。 |
| `static void` | `picture (double x, double y, String filename)` | 绘制指定图像，并使其中心位于 `(x, y)`。 |
| `static void` | `picture (double x, double y, String filename, double degrees)` | 绘制指定图像，使其中心位于 `(x, y)`，并旋转指定角度。 |
| `static void` | `picture (double x, double y, String filename, double scaledWidth, double scaledHeight)` | 绘制指定图像，使其中心位于 `(x, y)`，并缩放到指定的边界框中。 |
| `static void` | `picture (double x, double y, String filename, double scaledWidth, double scaledHeight, double degrees)` | 绘制指定图像，使其中心位于 `(x, y)`，旋转指定角度，并缩放到指定的边界框中。 |
| `static void` | `point (double x, double y)` | 绘制一个以 `(x, y)` 为中心的点。 |
| `static void` | `polygon (double[] x, double[] y)` | 绘制一个多边形，其顶点依次为 `(x₀, y₀)`、`(x₁, y₁)`、……、`(xₙ₋₁, yₙ₋₁)`。 |
| `static void` | `rectangle (double x, double y, double halfWidth, double halfHeight)` | 绘制一个以 `(x, y)` 为中心、大小为指定值的矩形。 |
| `static void` | `resetCanvasSize ()` | 将画布（绘图区）设置为默认的 512×512 像素。 |
| `static void` | `resetFont ()` | 将字体设置为默认字体（Sans Serif，无衬线，16 磅）。 |
| `static void` | `resetPenColor ()` | 将画笔颜色设置为默认颜色（黑色）。 |
| `static void` | `resetPenRadius ()` | 将画笔大小设置为默认值（0.002）。 |
| `static void` | `resetRenderingHints ()` | 恢复默认渲染提示。 |
| `static void` | `resetScale ()` | 将 x 轴和 y 轴的刻度范围都重置为默认范围（0.0 到 1.0）。 |
| `static void` | `resetXscale ()` | 将 x 轴刻度范围重置为默认范围（0.0 到 1.0）。 |
| `static void` | `resetYscale ()` | 将 y 轴刻度范围重置为默认范围（0.0 到 1.0）。 |
| `static void` | `save ( String filename)` | 将绘图保存为受支持格式的文件（通常为 JPEG、PNG、GIF、TIFF 和 BMP）。 |
| `static void` | `setCanvasSize (int canvasWidth, int canvasHeight)` | 将画布（绘图区）设置为 `width × height` 像素。 |
| `static void` | `setFont ( Font font)` | 将字体设置为指定值。 |
| `static void` | `setPenColor (int red, int green, int blue)` | 将画笔颜色设置为指定的 RGB 颜色。 |
| `static void` | `setPenColor ( Color color)` | 将画笔颜色设置为指定颜色。 |
| `static void` | `setPenRadius (double radius)` | 将画笔半径设置为指定大小。 |
| `static void` | `setRenderingHints ( RenderingHints hints)` | 用指定的渲染提示替换当前渲染提示。 |
| `static void` | `setRenderingQuality ()` | 将渲染提示设置为优先获得高质量绘图。 |
| `static void` | `setRenderingSpeed ()` | 将渲染提示设置为优先提高绘图速度。 |
| `static void` | `setScale (double min, double max)` | 将 x 轴和 y 轴的刻度范围都设置为同一个指定范围。 |
| `static void` | `setTitle ( String title)` | 将标准绘图窗口的标题设置为指定字符串。 |
| `static void` | `setVisible (boolean isVisible)` | 使绘图窗口可见或不可见。 |
| `static void` | `setXscale (double min, double max)` | 将 x 轴刻度范围设置为指定范围。 |
| `static void` | `setYscale (double min, double max)` | 将 y 轴刻度范围设置为指定范围。 |
| `static void` | `show ()` | 将离屏缓冲区复制到屏幕缓冲区。 |
| `static void` | `square (double x, double y, double halfLength)` | 绘制一个以 `(x, y)` 为中心、大小为指定值的正方形。 |
| `static void` | `text (double x, double y, String text)` | 使用当前字体绘制给定文本字符串，并使其中心位于 `(x, y)`。 |
| `static void` | `text (double x, double y, String text, double degrees)` | 使用当前字体绘制给定文本字符串，使其中心位于 `(x, y)`，并旋转指定角度。 |
| `static void` | `textLeft (double x, double y, String text)` | 使用当前字体绘制给定文本字符串，并以 `(x, y)` 为基准左对齐。 |
| `static void` | `textRight (double x, double y, String text)` | 使用当前字体绘制给定文本字符串，并以 `(x, y)` 为基准右对齐。 |

### 从 `java.lang.Object` 继承的方法

`clone`、`equals`、`getClass`、`hashCode`、`notify`、`notifyAll`、`toString`、`wait`、`wait`、`wait`

---

## 字段详细说明

### `AQUA`

```java
public static final
Color
AQUA
```

水绿色（0, 255, 255）。

### `BLACK`

```java
public static final
Color
BLACK
```

黑色（0, 0, 0）。

### `BLUE`

```java
public static final
Color
BLUE
```

蓝色（0, 0, 255）。

### `CYAN`

```java
public static final
Color
CYAN
```

青色（0, 255, 255）。

### `FUCHSIA`

```java
public static final
Color
FUCHSIA
```

紫红色（255, 0, 255）。

### `DARK_GRAY`

```java
public static final
Color
DARK_GRAY
```

深灰色（64, 64, 64）。

### `GRAY`

```java
public static final
Color
GRAY
```

灰色（128, 128, 128）。

### `GREEN`

```java
public static final
Color
GREEN
```

绿色（0, 128, 0）。

### `LIGHT_GRAY`

```java
public static final
Color
LIGHT_GRAY
```

浅灰色（192, 192, 192）。

### `LIME`

```java
public static final
Color
LIME
```

亮绿色（0, 255, 0）。

### `MAGENTA`

```java
public static final
Color
MAGENTA
```

品红色（255, 0, 255）。

### `MAROON`

```java
public static final
Color
MAROON
```

栗色（128, 0, 0）。

### `NAVY`

```java
public static final
Color
NAVY
```

海军蓝（0, 0, 128）。

### `OLIVE`

```java
public static final
Color
OLIVE
```

橄榄色（128, 128, 0）。

### `ORANGE`

```java
public static final
Color
ORANGE
```

橙色（255, 200, 0）。

### `PINK`

```java
public static final
Color
PINK
```

粉色（255, 175, 175）。

### `PURPLE`

```java
public static final
Color
PURPLE
```

紫色（128, 0, 128）。

### `RED`

```java
public static final
Color
RED
```

红色（255, 0, 0）。

### `SILVER`

```java
public static final
Color
SILVER
```

银色（192, 192, 192）。

### `TEAL`

```java
public static final
Color
TEAL
```

蓝绿色（0, 128, 128）。

### `WHITE`

```java
public static final
Color
WHITE
```

白色（255, 255, 255）。

### `YELLOW`

```java
public static final
Color
YELLOW
```

黄色（255, 255, 0）。

### `TRANSPARENT`

```java
public static final
Color
TRANSPARENT
```

100% 透明的颜色，用于透明背景。

### `BOOK_BLUE`

```java
public static final
Color
BOOK_BLUE
```

《Introduction to Programming in Java》中使用的蓝色。它对应 Pantone 300U，RGB 值约为（9, 90, 166）。

### `BOOK_LIGHT_BLUE`

```java
public static final
Color
BOOK_LIGHT_BLUE
```

《Introduction to Programming in Java》中使用的浅蓝色。RGB 值约为（103, 198, 243）。

### `BOOK_RED`

```java
public static final
Color
BOOK_RED
```

《Algorithms, 4th edition》中使用的红色。它对应 Pantone 1805U，RGB 值约为（150, 35, 31）。

### `PRINCETON_ORANGE`

```java
public static final
Color
PRINCETON_ORANGE
```

普林斯顿大学视觉标识中使用的橙色。它对应 PMS 158，RGB 值约为（245, 128, 37）。

---

## 方法详细说明

### `public static void setVisible(boolean isVisible)`

```java
public static void setVisible(boolean isVisible)
```

使绘图窗口可见或不可见。

- **参数：** `isVisible`：如果为 `true`，则使绘图窗口可见；否则隐藏绘图窗口。

### `public static void resetCanvasSize()`

```java
public static void resetCanvasSize()
```

将画布（绘图区）设置为默认的 512×512 像素。同时会使用默认背景色（白色）清除当前绘图。通常，这个方法只在程序刚开始时调用一次。

### `public static void setCanvasSize(int canvasWidth, int canvasHeight)`

```java
public static void setCanvasSize(int canvasWidth,
int canvasHeight)
```

将画布（绘图区）设置为 `width × height` 像素。同时会使用默认背景色（白色）清除当前绘图。通常，这个方法只在程序刚开始时调用一次。

- **参数：** `canvasWidth`：宽度（像素数）。
- **参数：** `canvasHeight`：高度（像素数）。
- **抛出：** `IllegalArgumentException`：除非 `canvasWidth` 和 `canvasHeight` 都为正数。

### `public static void close()`

```java
public static void close()
```

关闭标准绘图窗口。这样客户端程序就可以直接终止，而不必要求用户手动关闭标准绘图窗口。在调用此方法之后再次进行绘图，会恢复之前的窗口状态。

### `public static void setTitle( String title)`

```java
public static void setTitle(
String
title)
```

将标准绘图窗口的标题设置为指定字符串。

- **参数：** `title`：标题。
- **抛出：** `IllegalArgumentException`：如果 `title` 为 `null`。

### `public static void resetXscale()`

```java
public static void resetXscale()
```

将 x 轴刻度范围重置为默认范围（0.0 到 1.0）。

### `public static void resetYscale()`

```java
public static void resetYscale()
```

将 y 轴刻度范围重置为默认范围（0.0 到 1.0）。

### `public static void resetScale()`

```java
public static void resetScale()
```

将 x 轴和 y 轴的刻度范围都重置为默认范围（0.0 到 1.0）。

### `public static void setXscale(double min, double max)`

```java
public static void setXscale(double min,
double max)
```

将 x 轴刻度范围设置为指定范围。

- **参数：** `min`：x 轴刻度的最小值。
- **参数：** `max`：x 轴刻度的最大值。
- **抛出：** `IllegalArgumentException`：如果 `max == min`。
- **抛出：** `IllegalArgumentException`：如果 `min` 或 `max` 中任意一个是 `NaN` 或无穷大。

### `public static void setYscale(double min, double max)`

```java
public static void setYscale(double min,
double max)
```

将 y 轴刻度范围设置为指定范围。

- **参数：** `min`：y 轴刻度的最小值。
- **参数：** `max`：y 轴刻度的最大值。
- **抛出：** `IllegalArgumentException`：如果 `max == min`。
- **抛出：** `IllegalArgumentException`：如果 `min` 或 `max` 中任意一个是 `NaN` 或无穷大。

### `public static void setScale(double min, double max)`

```java
public static void setScale(double min,
double max)
```

将 x 轴和 y 轴的刻度范围都设置为同一个指定范围。

- **参数：** `min`：x 轴和 y 轴刻度的最小值。
- **参数：** `max`：x 轴和 y 轴刻度的最大值。
- **抛出：** `IllegalArgumentException`：如果 `max == min`。
- **抛出：** `IllegalArgumentException`：如果 `min` 或 `max` 中任意一个是 `NaN` 或无穷大。

### `public static void clear()`

```java
public static void clear()
```

使用默认背景色（白色）清空屏幕。

### `public static void clear( Color color)`

```java
public static void clear(
Color
color)
```

使用指定背景色清空屏幕。若要让背景透明，请使用 `StdDraw.TRANSPARENT`。

- **参数：** `color`：作为背景的颜色。
- **抛出：** `IllegalArgumentException`：如果 `color` 为 `null`。

### `public static double getPenRadius()`

```java
public static double getPenRadius()
```

返回当前画笔半径。

- **返回：** 当前画笔半径值。

### `public static void resetPenRadius()`

```java
public static void resetPenRadius()
```

将画笔大小设置为默认值（0.002）。画笔是圆形的，因此绘制的线段端点是圆头；设置画笔半径后绘制一个点，会得到一个具有指定半径的圆。画笔半径不受坐标缩放影响。

### `public static void setPenRadius(double radius)`

```java
public static void setPenRadius(double radius)
```

将画笔半径设置为指定大小。画笔是圆形的，因此绘制的线段端点是圆头；设置画笔半径后绘制一个点，会得到一个具有指定半径的圆。画笔半径不受坐标缩放影响。

- **参数：** `radius`：画笔半径。
- **抛出：** `IllegalArgumentException`：如果 `radius` 为负数、`NaN` 或无穷大。

### `public static Color getPenColor()`

```java
public static
Color
getPenColor()
```

返回当前画笔颜色。

- **返回：** 当前画笔颜色。

### `public static Color getBackgroundColor()`

```java
public static
Color
getBackgroundColor()
```

返回当前背景颜色。

- **返回：** 当前背景颜色。

### `public static void resetPenColor()`

```java
public static void resetPenColor()
```

将画笔颜色设置为默认颜色（黑色）。

### `public static void setPenColor( Color color)`

```java
public static void setPenColor(
Color
color)
```

将画笔颜色设置为指定颜色。`StdDraw` 预定义了许多画笔颜色，例如 `StdDraw.BLACK`、`StdDraw.WHITE`、`StdDraw.RED`、`StdDraw.GREEN` 和 `StdDraw.BLUE`。

- **参数：** `color`：画笔颜色。
- **抛出：** `IllegalArgumentException`：如果 `color` 为 `null`。

### `public static void setPenColor(int red, int green, int blue)`

```java
public static void setPenColor(int red,
int green,
int blue)
```

将画笔颜色设置为指定的 RGB 颜色。

- **参数：** `red`：红色分量（0 到 255）。
- **参数：** `green`：绿色分量（0 到 255）。
- **参数：** `blue`：蓝色分量（0 到 255）。
- **抛出：** `IllegalArgumentException`：如果 `red`、`green` 或 `blue` 超出规定范围。

### `public static Font getFont()`

```java
public static
Font
getFont()
```

返回当前字体。

- **返回：** 当前字体。

### `public static void resetFont()`

```java
public static void resetFont()
```

将字体设置为默认字体（Sans Serif，无衬线，16 磅）。

### `public static void setFont( Font font)`

```java
public static void setFont(
Font
font)
```

将字体设置为指定值。

- **参数：** `font`：字体。
- **抛出：** `IllegalArgumentException`：如果 `font` 为 `null`。

### `public static void setRenderingQuality()`

```java
public static void setRenderingQuality()
```

将渲染提示设置为优先获得高质量绘图。这是默认设置。该设置只影响之后的绘图命令；已经绘制的形状、文本或图片不会被重新渲染。

### `public static void setRenderingSpeed()`

```java
public static void setRenderingSpeed()
```

将渲染提示设置为优先提高绘图速度。这可能会降低抗锯齿、文本渲染和缩放图像的质量。该设置只影响之后的绘图命令；已经绘制的形状、文本或图片不会被重新渲染。

### `public static void resetRenderingHints()`

```java
public static void resetRenderingHints()
```

恢复默认渲染提示。这等价于调用 `setRenderingQuality()`。

### `public static void setRenderingHints( RenderingHints hints)`

```java
public static void setRenderingHints(
RenderingHints
hints)
```

用指定的渲染提示替换当前渲染提示。由于 `RenderingHints` 是可变对象，`StdDraw` 类会对参数进行防御性复制。因此，在调用此方法后再修改传入的参数，不会影响 `StdDraw` 实际使用的渲染提示。该设置只影响之后的绘图命令；已经绘制的形状、文本或图片不会被重新渲染。

- **参数：** `hints`：渲染提示。
- **抛出：** `IllegalArgumentException`：如果 `hints` 为 `null`。

### `public static void addRenderingHints( RenderingHints hints)`

```java
public static void addRenderingHints(
RenderingHints
hints)
```

将指定的渲染提示添加到当前渲染提示中。如果指定渲染提示中的某个键已经存在于当前渲染提示中，则会替换该键的值。由于 `RenderingHints` 是可变对象，`StdDraw` 类会对参数进行防御性复制。因此，在调用此方法后再修改传入的参数，不会影响 `StdDraw` 实际使用的渲染提示。该设置只影响之后的绘图命令；已经绘制的形状、文本或图片不会被重新渲染。

- **参数：** `hints`：要添加的渲染提示。
- **抛出：** `IllegalArgumentException`：如果 `hints` 为 `null`。

### `public static RenderingHints getRenderingHints()`

```java
public static
RenderingHints
getRenderingHints()
```

返回当前渲染提示的一个副本。返回对象是防御性副本；修改它不会影响 `StdDraw` 使用的渲染提示。

- **返回：** 当前渲染提示的一个副本。

### `public static void line(double x0, double y0, double x1, double y1)`

```java
public static void line(double x0,
double y0,
double x1,
double y1)
```

绘制从 `(x₀, y₀)` 到 `(x₁, y₁)` 的线段。

- **参数：** `x0`：一个端点的 x 坐标。
- **参数：** `y0`：一个端点的 y 坐标。
- **参数：** `x1`：另一个端点的 x 坐标。
- **参数：** `y1`：另一个端点的 y 坐标。
- **抛出：** `IllegalArgumentException`：如果任意坐标为 `NaN` 或无穷大。

### `public static void point(double x, double y)`

```java
public static void point(double x,
double y)
```

绘制一个以 `(x, y)` 为中心的点。这个点实际上是一个实心圆，其半径等于画笔半径。若要绘制单像素点，请先将画笔半径设为 0。

- **参数：** `x`：点的 x 坐标。
- **参数：** `y`：点的 y 坐标。
- **抛出：** `IllegalArgumentException`：如果 `x` 或 `y` 中任意一个为 `NaN` 或无穷大。

### `public static void circle(double x, double y, double radius)`

```java
public static void circle(double x,
double y,
double radius)
```

绘制一个以 `(x, y)` 为圆心、半径为指定值的圆。

- **参数：** `x`：圆心的 x 坐标。
- **参数：** `y`：圆心的 y 坐标。
- **参数：** `radius`：圆的半径。
- **抛出：** `IllegalArgumentException`：如果 `radius` 为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void filledCircle(double x, double y, double radius)`

```java
public static void filledCircle(double x,
double y,
double radius)
```

绘制一个以 `(x, y)` 为圆心、半径为指定值的实心圆。

- **参数：** `x`：圆心的 x 坐标。
- **参数：** `y`：圆心的 y 坐标。
- **参数：** `radius`：圆的半径。
- **抛出：** `IllegalArgumentException`：如果 `radius` 为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void ellipse(double x, double y, double semiMajorAxis, double semiMinorAxis)`

```java
public static void ellipse(double x,
double y,
double semiMajorAxis,
double semiMinorAxis)
```

绘制一个以 `(x, y)` 为中心、具有指定半长轴和半短轴的椭圆。

- **参数：** `x`：椭圆中心的 x 坐标。
- **参数：** `y`：椭圆中心的 y 坐标。
- **参数：** `semiMajorAxis`：椭圆的半长轴。
- **参数：** `semiMinorAxis`：椭圆的半短轴。
- **抛出：** `IllegalArgumentException`：如果 `semiMajorAxis` 或 `semiMinorAxis` 中任意一个为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void filledEllipse(double x, double y, double semiMajorAxis, double semiMinorAxis)`

```java
public static void filledEllipse(double x,
double y,
double semiMajorAxis,
double semiMinorAxis)
```

绘制一个以 `(x, y)` 为中心、具有指定半长轴和半短轴的实心椭圆。

- **参数：** `x`：椭圆中心的 x 坐标。
- **参数：** `y`：椭圆中心的 y 坐标。
- **参数：** `semiMajorAxis`：椭圆的半长轴。
- **参数：** `semiMinorAxis`：椭圆的半短轴。
- **抛出：** `IllegalArgumentException`：如果 `semiMajorAxis` 或 `semiMinorAxis` 中任意一个为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void arc(double x, double y, double radius, double angle1, double angle2)`

```java
public static void arc(double x,
double y,
double radius,
double angle1,
double angle2)
```

绘制一段以 `(x, y)` 为圆心、半径为指定值、从 `angle1` 到 `angle2`（单位：度）的圆弧。

- **参数：** `x`：圆心的 x 坐标。
- **参数：** `y`：圆心的 y 坐标。
- **参数：** `radius`：圆的半径。
- **参数：** `angle1`：起始角度。0 表示圆弧从 3 点钟方向开始。
- **参数：** `angle2`：圆弧结束角度。例如，如果希望得到 90° 的圆弧，则 `angle2` 应为 `angle1 + 90`。
- **抛出：** `IllegalArgumentException`：如果 `radius` 为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void square(double x, double y, double halfLength)`

```java
public static void square(double x,
double y,
double halfLength)
```

绘制一个以 `(x, y)` 为中心、大小为指定值的正方形。

- **参数：** `x`：正方形中心的 x 坐标。
- **参数：** `y`：正方形中心的 y 坐标。
- **参数：** `halfLength`：正方形任意一条边长度的一半。
- **抛出：** `IllegalArgumentException`：如果 `halfLength` 为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void filledSquare(double x, double y, double halfLength)`

```java
public static void filledSquare(double x,
double y,
double halfLength)
```

绘制一个以 `(x, y)` 为中心、大小为指定值的实心正方形。

- **参数：** `x`：正方形中心的 x 坐标。
- **参数：** `y`：正方形中心的 y 坐标。
- **参数：** `halfLength`：正方形任意一条边长度的一半。
- **抛出：** `IllegalArgumentException`：如果 `halfLength` 为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void rectangle(double x, double y, double halfWidth, double halfHeight)`

```java
public static void rectangle(double x,
double y,
double halfWidth,
double halfHeight)
```

绘制一个以 `(x, y)` 为中心、大小为指定值的矩形。

- **参数：** `x`：矩形中心的 x 坐标。
- **参数：** `y`：矩形中心的 y 坐标。
- **参数：** `halfWidth`：矩形宽度的一半。
- **参数：** `halfHeight`：矩形高度的一半。
- **抛出：** `IllegalArgumentException`：如果 `halfWidth` 或 `halfHeight` 中任意一个为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void filledRectangle(double x, double y, double halfWidth, double halfHeight)`

```java
public static void filledRectangle(double x,
double y,
double halfWidth,
double halfHeight)
```

绘制一个以 `(x, y)` 为中心、大小为指定值的实心矩形。

- **参数：** `x`：矩形中心的 x 坐标。
- **参数：** `y`：矩形中心的 y 坐标。
- **参数：** `halfWidth`：矩形宽度的一半。
- **参数：** `halfHeight`：矩形高度的一半。
- **抛出：** `IllegalArgumentException`：如果 `halfWidth` 或 `halfHeight` 中任意一个为负数。
- **抛出：** `IllegalArgumentException`：如果任意参数为 `NaN` 或无穷大。

### `public static void polygon(double[] x, double[] y)`

```java
public static void polygon(double[] x,
double[] y)
```

绘制一个多边形，其顶点依次为 `(x₀, y₀)`、`(x₁, y₁)`、……、`(xₙ₋₁, yₙ₋₁)`。

- **参数：** `x`：多边形所有顶点 x 坐标组成的数组。
- **参数：** `y`：多边形所有顶点 y 坐标组成的数组。
- **抛出：** `IllegalArgumentException`：除非 `x[]` 与 `y[]` 长度相同。
- **抛出：** `IllegalArgumentException`：如果任意坐标为 `NaN` 或无穷大。
- **抛出：** `IllegalArgumentException`：如果 `x[]` 或 `y[]` 中任意一个为 `null`。

### `public static void filledPolygon(double[] x, double[] y)`

```java
public static void filledPolygon(double[] x,
double[] y)
```

绘制一个实心多边形，其顶点依次为 `(x₀, y₀)`、`(x₁, y₁)`、……、`(xₙ₋₁, yₙ₋₁)`。

- **参数：** `x`：多边形所有顶点 x 坐标组成的数组。
- **参数：** `y`：多边形所有顶点 y 坐标组成的数组。
- **抛出：** `IllegalArgumentException`：除非 `x[]` 与 `y[]` 长度相同。
- **抛出：** `IllegalArgumentException`：如果任意坐标为 `NaN` 或无穷大。
- **抛出：** `IllegalArgumentException`：如果 `x[]` 或 `y[]` 中任意一个为 `null`。

### `public static void picture(double x, double y, String filename)`

```java
public static void picture(double x,
double y,
String
filename)
```

绘制指定图像，并使其中心位于 `(x, y)`。通常支持 JPEG、PNG、GIF、TIFF 和 BMP 等图像格式。作为一种优化，Java 会在文件系统层面对图片进行缓存，这会显著提高多次重绘同一图像（例如动画中）的性能。不过，如果你在首次绘制后修改了图片文件，之后的调用仍会绘制原先缓存的图片。

- **参数：** `x`：图像中心的 x 坐标。
- **参数：** `y`：图像中心的 y 坐标。
- **参数：** `filename`：图像/图片的文件名，例如 `"ball.gif"`。
- **抛出：** `IllegalArgumentException`：如果图像文件名无效。
- **抛出：** `IllegalArgumentException`：如果 `x` 或 `y` 中任意一个为 `NaN` 或无穷大。

### `public static void picture(double x, double y, String filename, double degrees)`

```java
public static void picture(double x,
double y,
String
filename,
double degrees)
```

绘制指定图像，使其中心位于 `(x, y)`，并将图像旋转指定角度。通常支持 JPEG、PNG、GIF、TIFF 和 BMP 等图像格式。

- **参数：** `x`：图像中心的 x 坐标。
- **参数：** `y`：图像中心的 y 坐标。
- **参数：** `filename`：图像/图片的文件名，例如 `"ball.gif"`。
- **参数：** `degrees`：逆时针旋转的角度数。
- **抛出：** `IllegalArgumentException`：如果图像文件名无效。
- **抛出：** `IllegalArgumentException`：如果 `x`、`y` 或 `degrees` 为 `NaN` 或无穷大。
- **抛出：** `IllegalArgumentException`：如果 `filename` 为 `null`。

### `public static void picture(double x, double y, String filename, double scaledWidth, double scaledHeight)`

```java
public static void picture(double x,
double y,
String
filename,
double scaledWidth,
double scaledHeight)
```

绘制指定图像，使其中心位于 `(x, y)`，并将其缩放到指定的边界框中。通常支持 JPEG、PNG、GIF、TIFF 和 BMP 等图像格式。

- **参数：** `x`：图像中心的 x 坐标。
- **参数：** `y`：图像中心的 y 坐标。
- **参数：** `filename`：图像/图片的文件名，例如 `"ball.gif"`。
- **参数：** `scaledWidth`：缩放后图像的宽度（使用屏幕坐标）。
- **参数：** `scaledHeight`：缩放后图像的高度（使用屏幕坐标）。
- **抛出：** `IllegalArgumentException`：如果 `scaledWidth` 或 `scaledHeight` 中任意一个为负数。
- **抛出：** `IllegalArgumentException`：如果图像文件名无效。
- **抛出：** `IllegalArgumentException`：如果 `x` 或 `y` 中任意一个为 `NaN` 或无穷大。
- **抛出：** `IllegalArgumentException`：如果 `filename` 为 `null`。

### `public static void picture(double x, double y, String filename, double scaledWidth, double scaledHeight, double degrees)`

```java
public static void picture(double x,
double y,
String
filename,
double scaledWidth,
double scaledHeight,
double degrees)
```

绘制指定图像，使其中心位于 `(x, y)`，将其旋转指定角度，并缩放到指定的边界框中。通常支持 JPEG、PNG、GIF、TIFF 和 BMP 等图像格式。

- **参数：** `x`：图像中心的 x 坐标。
- **参数：** `y`：图像中心的 y 坐标。
- **参数：** `filename`：图像/图片的文件名，例如 `"ball.gif"`。
- **参数：** `scaledWidth`：缩放后图像的宽度（使用屏幕坐标）。
- **参数：** `scaledHeight`：缩放后图像的高度（使用屏幕坐标）。
- **参数：** `degrees`：逆时针旋转的角度数。
- **抛出：** `IllegalArgumentException`：如果 `scaledWidth` 或 `scaledHeight` 中任意一个为负数。
- **抛出：** `IllegalArgumentException`：如果图像文件名无效。

### `public static void text(double x, double y, String text)`

```java
public static void text(double x,
double y,
String
text)
```

使用当前字体绘制给定文本字符串，并使其中心位于 `(x, y)`。

- **参数：** `x`：文本中心的 x 坐标。
- **参数：** `y`：文本中心的 y 坐标。
- **参数：** `text`：要绘制的文本。
- **抛出：** `IllegalArgumentException`：如果 `text` 为 `null`。
- **抛出：** `IllegalArgumentException`：如果 `x` 或 `y` 中任意一个为 `NaN` 或无穷大。

### `public static void text(double x, double y, String text, double degrees)`

```java
public static void text(double x,
double y,
String
text,
double degrees)
```

使用当前字体绘制给定文本字符串，使其中心位于 `(x, y)`，并旋转指定角度。

- **参数：** `x`：文本中心的 x 坐标。
- **参数：** `y`：文本中心的 y 坐标。
- **参数：** `text`：要绘制的文本。
- **参数：** `degrees`：逆时针旋转的角度数。
- **抛出：** `IllegalArgumentException`：如果 `text` 为 `null`。
- **抛出：** `IllegalArgumentException`：如果 `x`、`y` 或 `degrees` 中任意一个为 `NaN` 或无穷大。

### `public static void textLeft(double x, double y, String text)`

```java
public static void textLeft(double x,
double y,
String
text)
```

使用当前字体绘制给定文本字符串，并以 `(x, y)` 为基准左对齐。

- **参数：** `x`：文本的 x 坐标。
- **参数：** `y`：文本的 y 坐标。
- **参数：** `text`：文本。
- **抛出：** `IllegalArgumentException`：如果 `text` 为 `null`。
- **抛出：** `IllegalArgumentException`：如果 `x` 或 `y` 中任意一个为 `NaN` 或无穷大。

### `public static void textRight(double x, double y, String text)`

```java
public static void textRight(double x,
double y,
String
text)
```

使用当前字体绘制给定文本字符串，并以 `(x, y)` 为基准右对齐。

- **参数：** `x`：文本的 x 坐标。
- **参数：** `y`：文本的 y 坐标。
- **参数：** `text`：要绘制的文本。
- **抛出：** `IllegalArgumentException`：如果 `text` 为 `null`。
- **抛出：** `IllegalArgumentException`：如果 `x` 或 `y` 中任意一个为 `NaN` 或无穷大。

### `public static void pause(int t)`

```java
public static void pause(int t)
```

暂停 `t` 毫秒。此方法用于支持计算机动画。

- **参数：** `t`：毫秒数。
- **抛出：** `IllegalArgumentException`：如果 `t` 为负数。

### `public static void show()`

```java
public static void show()
```

将离屏缓冲区复制到屏幕缓冲区。除非启用了双缓冲，否则没有必要调用此方法。

### `public static void enableDoubleBuffering()`

```java
public static void enableDoubleBuffering()
```

启用双缓冲。此后对 `line()`、`circle()`、`square()` 等绘图方法的调用都会被延迟，直到下一次调用 `show()` 时才显示。此功能适合制作动画。

### `public static void disableDoubleBuffering()`

```java
public static void disableDoubleBuffering()
```

禁用双缓冲。此后调用 `line()`、`circle()`、`square()` 等绘图方法时，结果会立即显示在屏幕上。这是默认设置。

### `public static void save( String filename)`

```java
public static void save(
String
filename)
```

将绘图保存为受支持格式的文件（通常为 JPEG、PNG、GIF、TIFF 和 BMP）。文件扩展名必须为 `.jpg`、`.png`、`.gif`、`.bmp` 或 `.tif`。如果启用了双缓冲，保存的是屏幕缓冲区（即当前屏幕上显示的内容），而不是离屏缓冲区。

- **参数：** `filename`：文件名。
- **抛出：** `IllegalArgumentException`：如果 `filename` 为 `null`。
- **抛出：** `IllegalArgumentException`：如果 `filename` 是空字符串。
- **抛出：** `IllegalArgumentException`：如果 `filename` 的文件类型扩展名无效。
- **抛出：** `IllegalArgumentException`：如果无法写入文件 `filename`。

### `public void actionPerformed( ActionEvent event)`

```java
public void actionPerformed(
ActionEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `ActionListener` 中的 `actionPerformed`。

### `public static boolean isMousePressed()`

```java
public static boolean isMousePressed()
```

如果鼠标当前正被按下，则返回 `true`。

- **返回：** 如果鼠标正被按下则为 `true`；否则为 `false`。

### `public static double mouseX()`

```java
public static double mouseX()
```

返回鼠标的 x 坐标。

- **返回：** 鼠标的 x 坐标。

### `public static double mouseY()`

```java
public static double mouseY()
```

返回鼠标的 y 坐标。

- **返回：** 鼠标的 y 坐标。

### `public void mouseClicked( MouseEvent event)`

```java
public void mouseClicked(
MouseEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `MouseListener` 中的 `mouseClicked`。

### `public void mouseEntered( MouseEvent event)`

```java
public void mouseEntered(
MouseEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `MouseListener` 中的 `mouseEntered`。

### `public void mouseExited( MouseEvent event)`

```java
public void mouseExited(
MouseEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `MouseListener` 中的 `mouseExited`。

### `public void mousePressed( MouseEvent event)`

```java
public void mousePressed(
MouseEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `MouseListener` 中的 `mousePressed`。

### `public void mouseReleased( MouseEvent event)`

```java
public void mouseReleased(
MouseEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `MouseListener` 中的 `mouseReleased`。

### `public void mouseDragged( MouseEvent event)`

```java
public void mouseDragged(
MouseEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `MouseMotionListener` 中的 `mouseDragged`。

### `public void mouseMoved( MouseEvent event)`

```java
public void mouseMoved(
MouseEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `MouseMotionListener` 中的 `mouseMoved`。

### `public static boolean hasNextKeyTyped()`

```java
public static boolean hasNextKeyTyped()
```

如果用户已经键入了一个尚未处理的按键，则返回 `true`。

- **返回：** 如果用户已经键入了一个尚未被 `nextKeyTyped()` 处理的按键，则为 `true`；否则为 `false`。

### `public static char nextKeyTyped()`

```java
public static char nextKeyTyped()
```

返回用户键入的下一个、尚未被程序处理的按键。在调用本方法之前，应先调用 `hasNextKeyTyped()`，以确保确实存在下一个待处理按键。本方法返回与所键入按键对应的 Unicode 字符（例如 `'a'` 或 `'A'`）。它无法识别动作键（例如 F1 和方向键）或修饰键（例如 Ctrl）。

- **返回：** 用户键入的下一个、尚未被程序处理的按键。
- **抛出：** `NoSuchElementException`：如果没有剩余的按键可供读取。

### `public static boolean isKeyPressed(int keycode)`

```java
public static boolean isKeyPressed(int keycode)
```

如果给定按键当前正被按下，则返回 `true`。此方法接受按键码 `keycode`（对应一个物理按键）作为参数。它能够处理动作键（例如 F1 和方向键）以及修饰键（例如 Shift 和 Ctrl）。有关按键码的说明，请参阅 `KeyEvent`。

- **参数：** `keycode`：要检查是否正被按下的按键。
- **返回：** 如果 `keycode` 对应的按键当前正被按下，则为 `true`；否则为 `false`。

### `public void keyTyped( KeyEvent event)`

```java
public void keyTyped(
KeyEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `KeyListener` 中的 `keyTyped`。

### `public void keyPressed( KeyEvent event)`

```java
public void keyPressed(
KeyEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `KeyListener` 中的 `keyPressed`。

### `public void keyReleased( KeyEvent event)`

```java
public void keyReleased(
KeyEvent
event)
```

此方法不能被直接调用。

- **指定于：** 接口 `KeyListener` 中的 `keyReleased`。

### `public static void main( String [] args)`

```java
public static void main(
String
[] args)
```

测试客户端。

- **参数：** `args`：命令行参数。

---

## 文档信息

- **类：** `StdDraw`
- **原始页面标题：** `StdDraw`
- **Javadoc 生成版本：** 11.0.25
- **原始生成日期：** 2026-08-21
- **作者：** Robert Sedgewick、Kevin Wayne
