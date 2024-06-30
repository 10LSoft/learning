import { it, expect, describe, beforeEach, jest } from '@jest/globals'
import Service from '../src/service.js'
import fs from 'node:fs/promises'

describe('Service test', () => {
  let _service
  const filename = 'test.ndjson'

  beforeEach(() => {
    _service = new Service({ filename })
  })

  describe('#read', () => {
    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockResolvedValue('')

      const result = await _service.read()
      expect(result).toStrictEqual([])
    })

    it('should break if the file do not exists', async () => {
      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockRejectedValue(new Error('File not found'))

      await expect(() => _service.read()).rejects.toThrow('File not found')
    })
  })
})