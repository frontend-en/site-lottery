import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../src/assets/images/bands');
const targetDir = path.join(__dirname, '../src/assets/images/bands/webp');

async function convertImages() {
  try {
    // Создаем директорию для WebP если её нет
    await fs.mkdir(targetDir, { recursive: true });

    // Получаем список файлов
    const files = await fs.readdir(sourceDir);

    // Конвертируем все изображения в WebP
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, `${path.parse(file).name}.webp`);

        try {
          await sharp(sourcePath)
            .webp({ quality: 80 }) // Баланс между качеством и размером
            .toFile(targetPath);
          console.log(`Converted ${file} to WebP`);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
    }
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

convertImages();
