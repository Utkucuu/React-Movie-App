export * as MovieServices from "./getMovie";

//Bu kod bir JavaScript veya TypeScript modülünde kullanılan bir "named export" işlemidir. "named export" işlemi, bir modül içinde tanımlanan fonksiyonları, değişkenleri veya nesneleri başka bir modüle veya dosyaya dışa aktarmanın bir yoludur. Ancak, burada bir özel kullanım vardır: export * as MovieServices.

//Bu kod, getMovie adlı bir modülün içinde tanımlanan tüm fonksiyonları, değişkenleri veya nesneleri MovieServices adı altında başka bir modüle veya dosyaya dışa aktarır. Özellikle as ifadesi, tüm bu dışa aktarılan nesnelerin bir grup olarak MovieServices adı altında toplandığını belirtir. Yani, MovieServices bir grup adıdır ve içinde getMovie modülünün tüm içeriğini barındırır.
