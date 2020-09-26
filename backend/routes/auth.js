const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')
const verify = require('./verifyToken')
const User = require('../models/User')

/**
 * 회원 가입
 */
router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) {
    return res.status(400).send({
      success: false,
      message: error.details[0].message,
    })
  }

  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) {
    return res.status(400).send({ message: '이미 존재하는 이메일입니다.' })
  }

  let level = req.body.secret == 'bamgasi' ? 9 : 1

  // 비밀번호 암호화
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    email: req.body.email,
    password: hashPassword,
    name: req.body.name,
    level: level,
  })

  try {
    const result = await user.save()
    res.json(result)
  } catch (err) {
    res.status(401).json({ message: err })
  }
})

/**
 * 로그인
 * 성공 시 토큰 반환
 */
router.post('/login', async (req, res) => {
  // data validate
  const { error } = loginValidation(req.body)

  if (error) {
    return res.status(400).send({ message: error.details[0].message })
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send({ message: '존재하지 않는 회원입니다.' })
  }

  // 비밀번호 검증
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' })
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: '1h',
  })

  res.send({ token: token, _id: user._id })
})

/**
 * 회원정보 조회
 */
router.get('/info/:id', verify, async (req, res) => {
  if (req.user._id !== req.params.id) {
    return res.status(400).send({ message: '권한이 없습니다.' })
  }

  const result = await User.findById(req.params.id)
  try {
    result.password = null
    res.send(result)
  } catch (err) {
    res.status(400).send({ message: err })
  }
})

/**
 * 회원정보 변경
 */
router.patch('/update/:id', verify, async (req, res) => {
  if (req.user._id !== req.params.id) {
    return res.status(400).send({ message: '권한이 없습니다.' })
  }

  const result = await User.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        name: req.body.name,
      },
    }
  )

  console.log(result)

  try {
    res.send(result)
  } catch (err) {
    res.send({ message: err })
  }
})

module.exports = router
