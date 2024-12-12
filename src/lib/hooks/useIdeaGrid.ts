@@ .. @@
-import { useMemo } from 'react';
-import { Idea } from '../../types';
+import { useMemo, useCallback } from 'react';
+import { Idea, IdeaType } from '../../types';
+import { TYPE_COLORS } from '../constants/colors';

-interface UseIdeaGridProps {
+interface UseIdeaGridOptions {
   ideas: Idea[];
+  columns?: number;
+  gap?: number;
 }

-export function useIdeaGrid({ ideas }: UseIdeaGridProps) {
-  const gridStyles = useMemo(() => ({
-    display: 'grid',
-    gap: '1.5rem',
-    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
-    gridAutoFlow: 'dense',
-    gridAutoFlow: 'dense',
-  }), []);
+export function useIdeaGrid({ ideas, columns = 3, gap = 6 }: UseIdeaGridOptions) {
+  const getItemSpan = useCallback((type: IdeaType) => {
+    switch (type) {
+      case 'image':
+        return { colSpan: 1, rowSpan: 2 };
+      case 'media':
+        return { colSpan: 2, rowSpan: 1 };
+      default:
+        return { colSpan: 1, rowSpan: 1 };
+    }
+  }, []);
+
+  const gridStyles = useMemo(() => {
+    return {
+      display: 'grid',
+      gap: `${gap * 0.25}rem`,
+      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
+      gridAutoRows: 'minmax(200px, auto)',
+      gridAutoFlow: 'dense',
+      maxWidth: '100%',
+      margin: '0 auto',
+      padding: `${gap * 0.25}rem`,
+    };
+  }, [columns, gap]);

   return {
     gridStyles,
+    getItemSpan,
     isEmpty: ideas.length === 0,
   };
 }